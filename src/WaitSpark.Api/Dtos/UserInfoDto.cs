using WaitSpark.Common.Enums;

namespace WaitSpark.Api.Dtos;

public record UserInfoDto(Guid Id, string Email, string? DisplayName, UserStatus Status, List<TenantDto>? Tenants);
