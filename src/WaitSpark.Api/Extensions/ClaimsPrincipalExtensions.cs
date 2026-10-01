using System.Security.Claims;

namespace WaitSpark.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Returns the Supabase user id (the JWT <c>sub</c> claim), or null if missing or not a valid Guid.
    /// </summary>
    public static Guid? GetUid(this ClaimsPrincipal user) =>
        Guid.TryParse(user.FindFirstValue("sub"), out var uid) ? uid : null;
}
