using System.ComponentModel.DataAnnotations;

namespace WaitSpark.Api.Options;

public class QueueSettings
{
    public const string SectionName = "Queues";

    [Required]
    public string Schema { get; init; } = "";

    [Required]
    public string ScrapingJobs { get; init; } = "scraping_jobs";
}
