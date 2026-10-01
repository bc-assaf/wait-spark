namespace WaitSpark.Api.Exceptions;

public class ConflictException : ApiException
{
    public override int StatusCode => StatusCodes.Status409Conflict;

    public ConflictException()
    {
    }

    public ConflictException(string? message)
        : base(message)
    {
    }

    public ConflictException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
