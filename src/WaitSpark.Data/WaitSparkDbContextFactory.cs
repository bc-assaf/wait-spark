using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace WaitSpark.Data;

// Design-time only: lets EF tools create the DbContext without the API's startup code.
public class WaitSparkDbContextFactory : IDesignTimeDbContextFactory<WaitSparkDbContext>
{
    public WaitSparkDbContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddUserSecrets<WaitSparkDbContextFactory>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connectionString = config.GetConnectionString("Default")
            ?? throw new InvalidOperationException("ConnectionStrings:Default is missing.");

        var optionsBuilder = new DbContextOptionsBuilder<WaitSparkDbContext>()
            .UseNpgsql(connectionString)
            .UseSnakeCaseNamingConvention();

        return new WaitSparkDbContext(optionsBuilder.Options);
    }
}
