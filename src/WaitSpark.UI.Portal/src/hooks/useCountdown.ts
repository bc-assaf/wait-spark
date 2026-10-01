import { useCallback, useEffect, useState } from 'react'

/** Counts down whole seconds; `restart()` starts over. */
export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return
    const id = window.setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => window.clearTimeout(id)
  }, [remaining])

  const restart = useCallback(() => setRemaining(seconds), [seconds])
  return { remaining, restart }
}
