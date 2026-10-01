using System.Text.Json;
using System.Text.Json.Serialization;

namespace WaitSpark.Scraper;

public record QueueMessage<T>(
    [property: JsonPropertyName("msg_id")] long MessageId,
    [property: JsonPropertyName("read_ct")] int ReadCount,
    [property: JsonPropertyName("message")] T Message);

/// <summary>
/// Reads Supabase Queues (pgmq) through RPC calls to the "pgmq_public" schema.
/// The schema must be exposed in Supabase: Settings > API > Exposed schemas.
/// </summary>
public class SupabaseMessageQueue(Supabase.Client client)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task<IReadOnlyList<QueueMessage<T>>> ReadAsync<T>(
        string queueName, int count, int visibilityTimeoutSeconds, CancellationToken ct)
    {
        var response = await client.Rpc("read", new Dictionary<string, object>
        {
            { "queue_name", queueName },
            { "sleep_seconds", visibilityTimeoutSeconds },
            { "n", count }
        });
        if (string.IsNullOrWhiteSpace(response.Content)) return [];
        return JsonSerializer.Deserialize<List<QueueMessage<T>>>(response.Content, JsonOptions) ?? [];
    }

    public async Task ArchiveAsync(string queueName, long messageId, CancellationToken ct)
    {
        await client.Rpc("archive", new Dictionary<string, object>
        {
            { "queue_name", queueName },
            { "message_id", messageId }
        });
    }
}
