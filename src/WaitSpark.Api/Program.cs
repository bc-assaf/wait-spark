using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WaitSpark.Api.Middlewares;
using WaitSpark.Api.Options;
using WaitSpark.Api.Services;
using WaitSpark.Data;

public partial class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddOptions<SupabaseSettings>()
            .BindConfiguration(SupabaseSettings.SectionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();
        builder.Services.AddOptions<QueueSettings>()
            .BindConfiguration(QueueSettings.SectionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        var supabaseSettings = builder.Configuration.GetSection(SupabaseSettings.SectionName).Get<SupabaseSettings>()
            ?? throw new InvalidOperationException("Supabase configuration is missing.");
        var queueSettings = builder.Configuration.GetSection(QueueSettings.SectionName).Get<QueueSettings>()
            ?? throw new InvalidOperationException("Queues configuration is missing.");
        var supabaseUrl = supabaseSettings.Url;

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.MapInboundClaims = false;
                options.Authority = $"{supabaseUrl}/auth/v1";
                options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); // dev only: local Supabase serves HTTP
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = $"{supabaseUrl}/auth/v1",
                    ValidateAudience = true,
                    ValidAudience = "authenticated",
                    ValidateLifetime = true,
                    NameClaimType = "sub"
                };
            });
        builder.Services.AddAuthorization();

        builder.Services.AddDbContext<WaitSparkDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
                   .UseSnakeCaseNamingConvention());

        builder.Services.AddCors(options =>
            options.AddDefaultPolicy(policy =>
            {
                var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
                policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
            }));

        // Supabase Config
        builder.Services.AddSingleton(new Supabase.Client(supabaseUrl, supabaseSettings.SecretKey));

        var supabaseClient = new Supabase.Client(
           supabaseUrl,
           supabaseSettings.SecretKey,
           new Supabase.SupabaseOptions { Schema = queueSettings.Schema });

        await supabaseClient.InitializeAsync();


        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<JobService>();
        builder.Services.AddSingleton<IMessageQueue, SupabaseMessageQueue>();

        // Add services to the container.

        builder.Services.AddSingleton(supabaseClient);

        builder.Services.AddControllers().AddJsonOptions(o =>
            o.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.UseHttpsRedirection();
        app.UseCors();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}