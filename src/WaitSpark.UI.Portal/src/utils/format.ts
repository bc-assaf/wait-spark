/** 42 -> "0:42" */
export function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value)
}

export const MIN_PASSWORD_LENGTH = 8

/**
 * Turns what the user typed into an absolute http(s) URL (https is assumed when there is no scheme),
 * or null if it is not a website address.
 */
export function normalizeWebsiteUrl(input: string): string | null {
  const value = input.trim()
  if (!value || /\s/.test(value)) return null
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`)
    const validHost = url.hostname.includes('.') && !url.hostname.startsWith('.') && !url.hostname.endsWith('.')
    return (url.protocol === 'http:' || url.protocol === 'https:') && validHost ? url.href : null
  } catch {
    return null
  }
}
