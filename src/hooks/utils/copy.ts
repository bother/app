import * as Clipboard from 'expo-clipboard'
import { useCallback, useRef, useState } from 'react'

type Returns = [copied: boolean, copy: (data: string) => void]

export const useCopy = (): Returns => {
  const timer = useRef<NodeJS.Timeout>()

  const [copied, setCopied] = useState(false)

  const copy = useCallback((data: string) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    Clipboard.setString(data)

    setCopied(true)

    timer.current = setTimeout(() => setCopied(false), 3000)
  }, [])

  return [copied, copy]
}
