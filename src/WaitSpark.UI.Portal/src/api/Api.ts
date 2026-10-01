import type { CreateJobRequest, JobDto } from '@/types/onboarding'
import type { MeResponse } from '@/types/user'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** The API answers errors as `{ "message": "..." }` (or ProblemDetails with a `title`); fall back to the raw text. */
function errorMessage(text: string): string {
  try {
    const body: unknown = JSON.parse(text)
    if (body && typeof body === 'object') {
      const { message, title } = body as { message?: unknown; title?: unknown }
      if (typeof message === 'string') return message
      if (typeof title === 'string') return title
    }
  } catch {
    // Not JSON: use the text as is.
  }
  return text
}

export interface ApiOptions {
  baseUrl: string
  getAccessToken: () => Promise<string | null>
  /** Called when the API answers 401 (e.g. sign out and let the route guards redirect to /signin). */
  onUnauthorized: () => void | Promise<void>
}

/** All requests to WaitSpark.Api go through this class. */
export class Api {
  private readonly options: ApiOptions

  constructor(options: ApiOptions) {
    this.options = options
  }

  /** Gets the signed-in user's account, creating it on first sign-in. */
  getAccount(): Promise<MeResponse> {
    return this.request<MeResponse>('POST', '/api/v1/me/account')
  }

  /** Starts scraping the tenant's website, or returns the job that is already running. */
  startWebsiteJob(tenantPublicId: string, websiteUrl: string): Promise<JobDto> {
    const body: CreateJobRequest = { task: 'Website', websiteUrl }
    return this.request<JobDto>('POST', `/api/v1/tenants/${encodeURIComponent(tenantPublicId)}/jobs`, body)
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const token = await this.options.getAccessToken()
    const response = await fetch(`${this.options.baseUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (response.status === 401) {
      await this.options.onUnauthorized()
      throw new ApiError(401, 'Unauthorized')
    }
    if (!response.ok) {
      throw new ApiError(response.status, errorMessage(await response.text()) || response.statusText)
    }
    return (await response.json()) as T
  }
}
