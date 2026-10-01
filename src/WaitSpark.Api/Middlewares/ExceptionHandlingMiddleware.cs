using System.Net.Mime;
using System.Text.Json;
using WaitSpark.Api.Exceptions;

namespace WaitSpark.Api.Middlewares;

public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger)
{
    static readonly JsonSerializerOptions jsonOptions = new(JsonSerializerDefaults.Web);

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            var (statusCode, message) = MapException(ex);

            if (statusCode == StatusCodes.Status500InternalServerError)
            {
                logger.LogError(ex, "Unhandled exception processing {Method} {Path}",
                    context.Request.Method, context.Request.Path);
            }
            else
            {
                logger.LogWarning(ex, "Request {Method} {Path} failed with {StatusCode}",
                    context.Request.Method, context.Request.Path, statusCode);
            }

            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = statusCode;

            var errorDto = new { message };
            await context.Response.WriteAsync(JsonSerializer.Serialize(errorDto, jsonOptions));
        }
    }

    private static (int StatusCode, string Message) MapException(Exception ex) => ex switch
    {
        ApiException apiEx => (apiEx.StatusCode, apiEx.Message),
        ArgumentNullException => (StatusCodes.Status400BadRequest, ex.Message),
        ArgumentException => (StatusCodes.Status400BadRequest, ex.Message),
        _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred.")
    };
}
