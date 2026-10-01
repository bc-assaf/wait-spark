using WaitSpark.Common.Enums;

namespace WaitSpark.Api.Dtos;

public record JobDto(Guid Id, JobStatus Status, string? StatusMessage);
