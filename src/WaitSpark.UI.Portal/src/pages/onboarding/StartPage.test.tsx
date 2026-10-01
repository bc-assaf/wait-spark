import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme/theme'
import StartPage from './StartPage'

const mocks = vi.hoisted(() => ({
  startWebsiteJob: vi.fn(),
  refresh: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('@/api', () => ({ api: { startWebsiteJob: mocks.startWebsiteJob } }))
vi.mock('@/auth/useAuth', () => ({ useAuth: () => ({ signOut: mocks.signOut }) }))
vi.mock('@/hooks/useMe', () => ({
  useMe: () => ({
    me: {
      user: { id: 'u1', email: 'john@example.com', displayName: null, status: 'New', tenants: [{ publicId: 'abc123', name: null }] },
      isNewAccount: false,
      newTenant: null,
    },
    refresh: mocks.refresh,
  }),
}))

function renderPage() {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/onboarding/start']}>
        <Routes>
          <Route path="/onboarding/start" element={<StartPage />} />
          <Route path="/onboarding/progress" element={<p>progress page</p>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('StartPage', () => {
  it('rejects an invalid website without calling the API', async () => {
    renderPage()
    await userEvent.type(screen.getByLabelText('Website address'), 'not a website')
    await userEvent.click(screen.getByRole('button', { name: 'Build my screen' }))

    expect(await screen.findByText('Enter a valid website address')).toBeInTheDocument()
    expect(mocks.startWebsiteJob).not.toHaveBeenCalled()
  })

  it('starts the job with the normalized address, then goes to the progress page', async () => {
    mocks.startWebsiteJob.mockResolvedValue({ id: 'j1', status: 'Queued', statusMessage: 'Job Queued' })
    renderPage()
    await userEvent.type(screen.getByLabelText('Website address'), 'www.example.com')
    await userEvent.click(screen.getByRole('button', { name: 'Build my screen' }))

    expect(await screen.findByText('progress page')).toBeInTheDocument()
    expect(mocks.startWebsiteJob).toHaveBeenCalledWith('abc123', 'https://www.example.com/')
    expect(mocks.refresh).toHaveBeenCalled()
  })

  it('disables the input and button while the call is running', async () => {
    mocks.startWebsiteJob.mockReturnValue(new Promise(() => {}))
    renderPage()
    await userEvent.type(screen.getByLabelText('Website address'), 'example.com')
    await userEvent.click(screen.getByRole('button', { name: 'Build my screen' }))

    expect(screen.getByLabelText('Website address')).toBeDisabled()
    expect(screen.getByRole('button', { name: /build my screen/i })).toBeDisabled()
  })

  it('shows the error and lets the user edit and retry', async () => {
    mocks.startWebsiteJob.mockRejectedValueOnce(new Error('Failed to send a message to queue'))
    renderPage()
    await userEvent.type(screen.getByLabelText('Website address'), 'example.com')
    await userEvent.click(screen.getByRole('button', { name: 'Build my screen' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to send a message to queue')
    const input = screen.getByLabelText('Website address')
    expect(input).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Build my screen' })).toBeEnabled()

    mocks.startWebsiteJob.mockResolvedValue({ id: 'j1', status: 'Queued', statusMessage: null })
    await userEvent.clear(input)
    await userEvent.type(input, 'example.org')
    await userEvent.click(screen.getByRole('button', { name: 'Build my screen' }))
    expect(await screen.findByText('progress page')).toBeInTheDocument()
  })
})
