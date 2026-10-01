namespace WaitSpark.Api.Exceptions;

public class EntityExistsException : ApiException
{
    public override int StatusCode => StatusCodes.Status409Conflict;

    public EntityExistsException()
    {
    }

    public EntityExistsException(string? message)
        : base(message)
    {
    }

    public EntityExistsException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
