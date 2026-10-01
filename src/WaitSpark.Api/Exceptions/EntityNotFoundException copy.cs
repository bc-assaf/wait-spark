namespace WaitSpark.Api.Exceptions;

public class ForbiddenException : ApiException
{
    public override int StatusCode => StatusCodes.Status403Forbidden;

    public ForbiddenException()
    {
    }

    public ForbiddenException(string? message)
        : base(message)
    {
    }

    public ForbiddenException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
