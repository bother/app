import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

type Return = boolean

export const useKeyboard = (action: 'did' | 'will' = 'did'): Return => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = Keyboard.addListener(
      action === 'did' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => setVisible(true)
    )

    const hide = Keyboard.addListener(
      action === 'did' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setVisible(false)
    )

    return () => {
      show.remove()
      hide.remove()
    }
  }, [action])

  return visible
}
