using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;
using WaitSpark.Api.Dtos;
using WaitSpark.Api.Exceptions;
using WaitSpark.Api.Helpers;
using WaitSpark.Api.Options;
using WaitSpark.Data;
using WaitSpark.Data.Entities;

namespace WaitSpark.Api.Services;

public class UserService(WaitSparkDbContext db, Supabase.Client supabase, IOptions<SupabaseSettings> supabaseSettings)
{
    private const int MaxPublicIdAttempts = 5;

    private async Task<UserInfoDto?> GetInfoAsync(Guid uid, CancellationToken ct)
    {
        return await db.Users
            .Include(u => u.Tenants)
            .Where(u => u.Uid == uid)
            .Select(u => new UserInfoDto(
                u.Id,
                u.Email,
                u.DisplayName,
                u.Status,
                u.Tenants.Select(t => new TenantDto(t.PublicId, t.Name)).ToList()))
            .FirstOrDefaultAsync(ct);
    }

    /// <summary>
    /// Creates a User and its owned Tenant.
    /// </summary>
    public async Task<GetOrCreateUserResponse> GetOrCreateAccountAsync(
        Guid uid, string email, CancellationToken ct)
    {
        var userInfo = await GetInfoAsync(uid, ct);

        if (userInfo is not null) return new GetOrCreateUserResponse(
            userInfo,
            IsNewAccount: false);

        // Verify against Supabase Auth: the JWT's user_metadata.email_verified is user-editable.
        var authUser = await supabase.AdminAuth(supabaseSettings.Value.SecretKey).GetUserById(uid.ToString());
        if (authUser?.EmailConfirmedAt is null)
            throw new ForbiddenException("Please verify your email address before continuing.");

        // Create new user and tenant
        var now = DateTime.UtcNow;
        var user = new User
        {
            Id = Guid.NewGuid(),
            Uid = uid,
            Email = email,
            CreatedAt = now,
        };

        for (var attempt = 1; ; attempt++)
        {
            var tenant = new Tenant
            {
                Id = Guid.NewGuid(),
                Name = "Business Name",
                OwnerUserId = user.Id,
                PublicId = PublicIdGenerator.Generate(),
                CreatedAt = now,
                StatusChangedAt = now,
            };
            db.Users.Add(user);
            db.Tenants.Add(tenant);

            try
            {
                await db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation } pg)
            {
                db.ChangeTracker.Clear();
                if (pg.ConstraintName?.Contains(nameof(Tenant.PublicId)) == true)
                {
                    if (attempt < MaxPublicIdAttempts) continue;
                    throw;
                }

                // The user was created concurrently by another request: return that account.
                var existing = await GetInfoAsync(uid, ct);
                if (existing is null) throw;

                return new GetOrCreateUserResponse(existing, IsNewAccount: false);
            }

            var newTenantDto = new TenantDto(tenant.PublicId, tenant.Name);

            return new GetOrCreateUserResponse(
                new UserInfoDto(user.Id, user.Email, user.DisplayName, user.Status, [newTenantDto]),
                IsNewAccount: true, newTenantDto
            );
        }
    }
}