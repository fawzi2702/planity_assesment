import { createContext, useContext, useState } from 'react'

import { fetchCalendarEvents } from '../api/event.api'
import { CalendarEvent } from '../types/event.type'
import { computeCalendarEventsLayout } from '../utils/event'

export const useCalendarStore = () => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])

  const getCalendarEvents = async () => {
    try {
      const calendarEventsResponse = await fetchCalendarEvents()
      const formattedEvents = computeCalendarEventsLayout(calendarEventsResponse)
      setCalendarEvents(formattedEvents)
    } catch (error) {
      // DO NOTHING
    }
  }

  return {
    calendarEvents,

    getCalendarEvents,
  }
}

export type CalendarStore = ReturnType<typeof useCalendarStore>

export const CalendarStoreContext = createContext<CalendarStore>(null)

export const getCalendarStore = () => {
  return useContext(CalendarStoreContext)
}
