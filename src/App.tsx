import { useEffect } from 'react'

import { Calendar } from './components/Calendar'
import { CalendarStoreContext, useCalendarStore } from './core/stores/calendar.store'
import { useWindowSizeStore, WindowSizeContext } from './core/stores/window.store'

function App() {
  const calendarStore = useCalendarStore()
  const windowSizeStore = useWindowSizeStore()

  useEffect(() => {
    calendarStore.getCalendarEvents()
  }, [])

  return (
    <CalendarStoreContext.Provider value={calendarStore}>
      <WindowSizeContext.Provider value={windowSizeStore}>
        <Calendar />
      </WindowSizeContext.Provider>
    </CalendarStoreContext.Provider>
  )
}

export default App
