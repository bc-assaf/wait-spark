namespace WaitSpark.Api.Exceptions;

public class EntityNotFoundException : ApiException
{
    public override int StatusCode => StatusCodes.Status404NotFound;

    public EntityNotFoundException()
    {
    }

    public EntityNotFoundException(string? message)
        : base(message)
    {
    }

    public EntityNotFoundException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
