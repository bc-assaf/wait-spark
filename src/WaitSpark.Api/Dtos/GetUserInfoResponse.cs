namespace WaitSpark.Api.Dtos;

public record GetUserInfoResponse(UserInfoDto? User, List<TenantDto>? Tenants);
