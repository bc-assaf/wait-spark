using WaitSpark.Scraper;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<SupabaseOptions>(builder.Configuration.GetSection(SupabaseOptions.SectionName));
builder.Services.Configure<QueueOptions>(builder.Configuration.GetSection(QueueOptions.SectionName));

var supabaseClient = new Supabase.Client(
    builder.Configuration["Supabase:Url"]
        ?? throw new InvalidOperationException("Supabase:Url configuration is missing."),
    builder.Configuration["Supabase:SecretKey"]
        ?? throw new InvalidOperationException("Supabase:SecretKey configuration is missing."),
    new Supabase.SupabaseOptions
    {
        Schema = builder.Configuration["Queues:Schema"]
            ?? throw new InvalidOperationException("Queues:Schema configuration is missing.")
    });
await supabaseClient.InitializeAsync();

builder.Services.AddSingleton(supabaseClient);
builder.Services.AddSingleton<SupabaseMessageQueue>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
