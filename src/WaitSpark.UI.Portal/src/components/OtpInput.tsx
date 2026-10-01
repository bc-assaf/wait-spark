import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  autoFocus?: boolean
}

/** Six single-digit boxes with a dash in the middle. `value` holds the digits typed so far. */
export function OtpInput({ value, onChange, length = 6, disabled, autoFocus }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const half = length / 2

  const focusAt = (index: number) => inputs.current[Math.max(0, Math.min(index, length - 1))]?.focus()

  const setDigit = (index: number, digit: string) => {
    const digits = value.padEnd(length, ' ').split('')
    digits[index] = digit || ' '
    onChange(digits.join('').trimEnd().replace(/ /g, ''))
  }

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (!digits) {
      if (raw === '') setDigit(index, '')
      return
    }
    // Typing into a filled box or autofill can deliver several digits at once.
    const next = (value.slice(0, index) + digits).slice(0, length)
    onChange(next)
    focusAt(Math.min(next.length, length - 1))
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && !value[index]) {
      e.preventDefault()
      if (index > 0) {
        onChange(value.slice(0, index - 1))
        focusAt(index - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      focusAt(index - 1)
    } else if (e.key === 'ArrowRight') {
      focusAt(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!digits) return
    e.preventDefault()
    onChange(digits)
    focusAt(digits.length)
  }

  const boxes = Array.from({ length }, (_, index) => (
    <InputBase
      key={index}
      value={value[index] ?? ''}
      disabled={disabled}
      autoFocus={autoFocus && index === 0}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onPaste={handlePaste}
      onFocus={(e) => e.target.select()}
      inputRef={(el: HTMLInputElement | null) => {
        inputs.current[index] = el
      }}
      slotProps={{
        input: {
          inputMode: 'numeric',
          autoComplete: index === 0 ? 'one-time-code' : 'off',
          'aria-label': `Digit ${index + 1}`,
          maxLength: index === 0 ? length : 1,
          style: { textAlign: 'center' },
        },
      }}
      sx={(theme) => {
        const { primary, divider } = (theme.vars ?? theme).palette
        const tint = (percent: number) => `color-mix(in srgb, ${primary.main} ${percent}%, transparent)`
        return {
          flex: '1 1 0',
          minWidth: 0,
          maxWidth: 66,
          height: 76,
          borderRadius: '8px',
          fontSize: 32,
          border: `1px solid ${value[index] ? primary.light : divider}`,
          bgcolor: value[index] ? tint(4) : 'background.paper',
          '&.Mui-focused': {
            border: `2px solid ${primary.main}`,
            bgcolor: 'background.paper',
            boxShadow: `0 0 0 4px ${tint(18)}`,
          },
          '& input': { p: 0, height: '100%' },
        }
      }}
    />
  ))

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: '12px' } }}>
      {boxes.slice(0, half)}
      <Box component="span" aria-hidden sx={{ fontSize: 24, color: 'text.disabled' }}>
        –
      </Box>
      {boxes.slice(half)}
    </Box>
  )
}
