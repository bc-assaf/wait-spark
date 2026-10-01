import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import type { Session } from '@supabase/supabase-js'
import App from '@/App'
import { theme } from '@/theme/theme'
import type { AccountStatus, MeResponse } from '@/types/user'

const mocks = vi.hoisted(() => ({
  session: null as Session | null,
  getAccount: vi.fn(),
}))

vi.mock('@/auth/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
        queueMicrotask(() => callback('INITIAL_SESSION', mocks.session))
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      },
      signOut: vi.fn(),
    },
  },
}))

vi.mock('@/api', () => ({ api: { getAccount: mocks.getAccount } }))

function signedIn(status: AccountStatus) {
  mocks.session = { user: { id: 'user-1' } } as Session
  mocks.getAccount.mockResolvedValue({
    user: { id: 'u1', email: 'a@b.c', displayName: null, status, tenants: null },
    isNewAccount: false,
    newTenant: null,
  } satisfies MeResponse)
}

function renderAt(path: string) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

beforeEach(() => {
  mocks.session = null
  mocks.getAccount.mockReset()
})

describe('unauthenticated user', () => {
  it.each(['/', '/dashboard', '/onboarding/start', '/onboarding/progress', '/onboarding/completed', '/nope'])(
    'is redirected from %s to the sign in page',
    async (path) => {
      renderAt(path)
      expect(await screen.findByRole('heading', { name: 'Welcome back!' })).toBeInTheDocument()
      expect(mocks.getAccount).not.toHaveBeenCalled()
    },
  )

  it('can open the public pages', async () => {
    renderAt('/signup')
    expect(await screen.findByRole('heading', { name: 'Welcome to Wait Spark!' })).toBeInTheDocument()
  })

  it('is sent from /otp without an email back to sign up', async () => {
    renderAt('/otp')
    expect(await screen.findByRole('heading', { name: 'Welcome to Wait Spark!' })).toBeInTheDocument()
  })
})

describe('legal pages', () => {
  it.each([
    ['/terms', 'Terms of Service'],
    ['/privacy', 'Privacy Policy'],
  ])('%s is open to signed-out users with a Start free trial link', async (path, heading) => {
    renderAt(path)
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Start free trial' })).toHaveAttribute('href', '/signup')
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
  })

  it.each([
    ['/terms', 'Terms of Service'],
    ['/privacy', 'Privacy Policy'],
  ])('%s is open to signed-in users with a Home link', async (path, heading) => {
    signedIn('Active')
    renderAt(path)
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Home' })).toHaveAttribute('href', '/dashboard')
    expect(screen.queryByRole('link', { name: 'Start free trial' })).not.toBeInTheDocument()
  })

  it('links to them from the sign up page', async () => {
    renderAt('/signup')
    await screen.findByRole('heading', { name: 'Welcome!' })
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
  })
})

describe('authenticated user', () => {
  it.each([
    ['New', 'Your Business Profile'],
    ['Onboarding', 'Setting things up'],
    ['Active', 'Dashboard'],
  ] as const)('with status %s lands on the matching page from /', async (status, heading) => {
    signedIn(status)
    renderAt('/')
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
  })

  it('is redirected away from the sign in page', async () => {
    signedIn('Active')
    renderAt('/signin')
    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('cannot open a page that does not match their status', async () => {
    signedIn('New')
    renderAt('/dashboard')
    expect(await screen.findByRole('heading', { name: 'Your Business Profile' })).toBeInTheDocument()
  })

  it('shows an error when the account has no status', async () => {
    signedIn('None')
    renderAt('/')
    expect(await screen.findByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  it('shows a retry when the status cannot be loaded', async () => {
    signedIn('Active')
    mocks.getAccount.mockRejectedValueOnce(new Error('boom'))
    renderAt('/dashboard')
    expect(await screen.findByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })
})
