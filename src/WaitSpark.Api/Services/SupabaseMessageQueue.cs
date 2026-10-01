namespace WaitSpark.Api.Services;

/// <summary>
/// Sends to Supabase Queues (pgmq) through the PostgREST "pgmq_public" schema.
/// The schema must be exposed in Supabase: Settings > API > Exposed schemas.
/// </summary>
public class SupabaseMessageQueue(Supabase.Client client, ILogger<SupabaseMessageQueue> logger) : IMessageQueue
{
    public async Task SendAsync<T>(string queueName, T message, CancellationToken ct)
    {
        if (message is null) return;

        await client.Rpc("send", new Dictionary<string, object>
        {
            { "queue_name", queueName },
            { "message", message }
        });

        logger.LogDebug("Message sent on queue {queue}", queueName);
    }
}
