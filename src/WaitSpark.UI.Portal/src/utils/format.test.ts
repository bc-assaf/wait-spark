import { normalizeWebsiteUrl } from './format'

describe('normalizeWebsiteUrl', () => {
  it.each([
    ['www.example.com', 'https://www.example.com/'],
    ['  example.com/path?q=1 ', 'https://example.com/path?q=1'],
    ['http://example.com', 'http://example.com/'],
    ['https://www.brightsidedental.com', 'https://www.brightsidedental.com/'],
  ])('accepts %s', (input, expected) => {
    expect(normalizeWebsiteUrl(input)).toBe(expected)
  })

  it.each(['', '   ', 'example', 'not a url', 'ftp://example.com', 'http://', 'example.', '.com', 'a b.com'])(
    'rejects "%s"',
    (input) => {
      expect(normalizeWebsiteUrl(input)).toBeNull()
    },
  )
})
