/** Statuses a signed-in user can be routed by. */
export type UserStatus = 'New' | 'Onboarding' | 'Active'

/** Status as returned by the API; `None` is never a valid state for a signed-in user. */
export type AccountStatus = 'None' | UserStatus

export interface TenantDto {
  publicId: string
  name: string | null
}

export interface UserInfoDto {
  id: string
  email: string
  displayName: string | null
  status: AccountStatus
  tenants: TenantDto[] | null
}

/** Response of `POST /api/v1/me/account`. */
export interface MeResponse {
  user: UserInfoDto
  isNewAccount: boolean
  newTenant: TenantDto | null
}
