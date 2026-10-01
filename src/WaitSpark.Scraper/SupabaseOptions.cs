namespace WaitSpark.Scraper;

public class SupabaseOptions
{
    public const string SectionName = "Supabase";

    public string Url { get; set; } = "";
    public string SecretKey { get; set; } = "";
    public int VisibilityTimeoutSeconds { get; set; } = 300;
    public int PollIntervalSeconds { get; set; } = 5;
}

public class QueueOptions
{
    public const string SectionName = "Queues";

    public string ScrapingJobs { get; set; } = "scraping_jobs";
    public string Schema { get; set; } = "pgmq_public";
}
