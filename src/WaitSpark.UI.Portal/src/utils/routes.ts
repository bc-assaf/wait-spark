import type { UserStatus } from '@/types/user'

/** The page a user lands on for each status. */
export const STATUS_HOME: Record<UserStatus, string> = {
  New: '/onboarding/start',
  Onboarding: '/onboarding/progress',
  Active: '/dashboard',
}

export const ROUTES = {
  signUp: '/signup',
  onboardingProgress: '/onboarding/progress',
  dashboard: '/dashboard',
  terms: '/terms',
  privacy: '/privacy',
} as const

export const EXTERNAL_LINKS = {
  home: 'https://www.waitspark.com',
  help: 'http://docs.waitspark.com/',
  company: 'https://boldercode.com/',
} as const
