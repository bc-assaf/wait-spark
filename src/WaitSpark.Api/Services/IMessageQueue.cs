namespace WaitSpark.Api.Services;

/// <summary>
/// Sends messages to a named queue. Implemented over Supabase Queues today; inject the interface so it can be swapped.
/// </summary>
public interface IMessageQueue
{
    Task SendAsync<T>(string queueName, T message, CancellationToken ct);
}
