namespace WaitSpark.Api.Dtos;

public record GetOrCreateUserResponse(
    UserInfoDto User,
    bool IsNewAccount,
    TenantDto? NewTenant = null);
