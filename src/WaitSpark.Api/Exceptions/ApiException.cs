namespace WaitSpark.Api.Exceptions;

public abstract class ApiException : Exception
{
    public abstract int StatusCode { get; }

    protected ApiException()
    {
    }

    protected ApiException(string? message)
        : base(message)
    {
    }

    protected ApiException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
