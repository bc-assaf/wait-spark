using Microsoft.Extensions.Options;
using WaitSpark.Common.Models;

namespace WaitSpark.Scraper;

public class Worker(
    ILogger<Worker> logger,
    SupabaseMessageQueue queue,
    IOptions<SupabaseOptions> options,
    IOptions<QueueOptions> queueOptions) : BackgroundService
{
    private readonly SupabaseOptions _options = options.Value;
    private readonly QueueOptions _queues = queueOptions.Value;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Listening on queue {Queue}", _queues.ScrapingJobs);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var messages = await queue.ReadAsync<ScrapingJobMessage>(
                    _queues.ScrapingJobs, 10, _options.VisibilityTimeoutSeconds, stoppingToken);

                foreach (var msg in messages)
                {
                    logger.LogInformation(
                        "Received scraping job message {MessageId}: TenantId={TenantId}, JobId={JobId}",
                        msg.MessageId, msg.Message.TenantId, msg.Message.JobId);

                    // TODO: run the scraping job. For now, just acknowledge.
                    await queue.ArchiveAsync(_queues.ScrapingJobs, msg.MessageId, stoppingToken);
                }

                if (messages.Count > 0) continue;
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to read from queue {Queue}", _queues.ScrapingJobs);
            }

            await Task.Delay(TimeSpan.FromSeconds(_options.PollIntervalSeconds), stoppingToken)
                .ContinueWith(_ => { }, CancellationToken.None);
        }
    }
}
