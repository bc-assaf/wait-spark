using Microsoft.EntityFrameworkCore;
using WaitSpark.Data.Entities;

namespace WaitSpark.Data;

public class WaitSparkDbContext(DbContextOptions<WaitSparkDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<Job> Jobs => Set<Job>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<Enum>().HaveConversion<string>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tenant>(e =>
        {
            e.Property(t => t.PublicId).IsFixedLength();
            e.HasOne(t => t.OwnerUser)
                .WithMany(t => t.Tenants)
                .HasForeignKey(t => t.OwnerUserId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Job>(e =>
        {
            e.HasOne(j => j.Tenant)
                .WithMany()
                .HasForeignKey(j => j.TenantId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
