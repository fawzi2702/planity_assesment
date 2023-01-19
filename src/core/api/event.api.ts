import { fetcher } from '../helpers/fetcher'
import { calendarEventTransformer } from '../transformers/event.transformer'
import { CalendarEventResponse } from '../types/event.type'
import { eventsResponseValidator } from '../validators/event.validator'

export const fetchCalendarEvents = async () => {
  const endpoint = process.env.REACT_APP_CALENDAR_EVENT_ENDPOINT

  try {
    const data = await fetcher<CalendarEventResponse[]>(endpoint)

    const isValid = eventsResponseValidator(data)
    if (!isValid) {
      throw new Error('invalid_data')
    }

    const transformedEvents = calendarEventTransformer(data)
    return Promise.resolve(transformedEvents)
  } catch (error) {
    return Promise.reject(error)
  }
}
