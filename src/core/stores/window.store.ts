import { createContext, useContext, useEffect, useState } from 'react'

export type WindowSize = {
  width: number
  height: number
}

export const useWindowSizeStore = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return {
    window: windowSize,
  }
}

export type WindowSizeStore = ReturnType<typeof useWindowSizeStore>

export const WindowSizeContext = createContext<WindowSizeStore>(null)

export const getWindowSizeStore = () => {
  return useContext(WindowSizeContext)
}
