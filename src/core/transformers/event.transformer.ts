import { CalendarEvent, CalendarEventResponse } from '../types/event.type'
import { generateRandomHexColor } from '../utils/color'
import { CALENDAR_DAY_DURATION, CALENDAR_DAY_START, parseTime } from '../utils/time'

export const calendarEventTransformer = (events: CalendarEventResponse[]): CalendarEvent[] => {
  return events.map<CalendarEvent>((event) => {
    let start = parseTime(event.start) - CALENDAR_DAY_START
    let end = start + event.duration
    const backgroundColor = generateRandomHexColor()

    if (start < 0) {
      start = 0
    }

    if (end > CALENDAR_DAY_DURATION) {
      end = CALENDAR_DAY_DURATION
    }

    return {
      id: event.id,
      start,
      end,
      backgroundColor,
      overlapsEvents: new Map<number, CalendarEvent>(),
      widthDivider: 1,
      horizontalPostionIndex: null,
    }
  })
}
