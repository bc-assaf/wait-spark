import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OtpInput } from './OtpInput'

function Harness({ onValue }: { onValue: (value: string) => void }) {
  const [value, setValue] = useState('')
  return (
    <OtpInput
      value={value}
      onChange={(v) => {
        setValue(v)
        onValue(v)
      }}
    />
  )
}

describe('OtpInput', () => {
  it('moves focus forward while typing and collects the digits', async () => {
    const onValue = vi.fn()
    render(<Harness onValue={onValue} />)
    await userEvent.click(screen.getByLabelText('Digit 1'))
    await userEvent.keyboard('4821')
    expect(onValue).toHaveBeenLastCalledWith('4821')
    expect(screen.getByLabelText('Digit 5')).toHaveFocus()
  })

  it('ignores non-digits', async () => {
    const onValue = vi.fn()
    render(<Harness onValue={onValue} />)
    await userEvent.click(screen.getByLabelText('Digit 1'))
    await userEvent.keyboard('a-b')
    expect(onValue).not.toHaveBeenCalled()
  })

  it('accepts a pasted code', async () => {
    const onValue = vi.fn()
    render(<Harness onValue={onValue} />)
    await userEvent.click(screen.getByLabelText('Digit 1'))
    await userEvent.paste('482 915')
    expect(onValue).toHaveBeenLastCalledWith('482915')
  })

  it('backspace in an empty box clears the previous digit and steps back', async () => {
    const onValue = vi.fn()
    render(<Harness onValue={onValue} />)
    await userEvent.click(screen.getByLabelText('Digit 1'))
    await userEvent.keyboard('48')
    await userEvent.keyboard('{Backspace}')
    expect(onValue).toHaveBeenLastCalledWith('4')
    expect(screen.getByLabelText('Digit 2')).toHaveFocus()
  })
})
