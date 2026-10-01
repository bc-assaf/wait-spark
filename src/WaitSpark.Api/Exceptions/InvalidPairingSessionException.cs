namespace WaitSpark.Api.Exceptions;

public class InvalidPairingSessionException : ApiException
{
    public override int StatusCode => StatusCodes.Status410Gone;

    public InvalidPairingSessionException()
    {
    }

    public InvalidPairingSessionException(string? message)
        : base(message)
    {
    }

    public InvalidPairingSessionException(string? message, Exception innerException)
        : base(message, innerException)
    {
    }
}
