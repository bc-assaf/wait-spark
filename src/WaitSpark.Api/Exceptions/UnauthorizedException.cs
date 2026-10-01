namespace WaitSpark.Api.Exceptions;

public class UnauthorizedException : ApiException
{
    public override int StatusCode => StatusCodes.Status401Unauthorized;

    public UnauthorizedException()
    {
    }

    public UnauthorizedException(string? message)
        : base(message)
    {
    }

    public UnauthorizedException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
