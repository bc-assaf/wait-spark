namespace WaitSpark.Api.Dtos;

public enum JobRequestTask
{
    Website
}

public record CreateJobRequest(JobRequestTask Task, string? WebsiteUrl);
