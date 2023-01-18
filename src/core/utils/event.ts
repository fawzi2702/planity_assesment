import { CalendarEvent } from '../types/event.type'
import { CALENDAR_DAY_DURATION, CALENDAR_DAY_START } from './time'

export const sortCalendarEventsByEndTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => a.end - b.end)
}

export const computeCalendarEventsGroups = (calendarEvents: CalendarEvent[]): CalendarEvent[] => {
  if (calendarEvents.length === 0) {
    return calendarEvents
  }

  sortCalendarEventsByEndTime(calendarEvents)

  let referenceCalendarEvent: CalendarEvent = calendarEvents[0]
  let currentCalendarGroup: CalendarEvent[] = []
  let groupEnd: number = referenceCalendarEvent.end

  for (let i = 1; i < calendarEvents.length; i++) {
    const currentCalendarEvent = calendarEvents[i]

    if (groupEnd > currentCalendarEvent.start) {
      currentCalendarGroup.push(currentCalendarEvent)
      if (currentCalendarEvent.end > groupEnd) {
        groupEnd = currentCalendarEvent.end
      }
    } else {
      currentCalendarGroup.unshift(referenceCalendarEvent)
      formatCalendarGroupEvents(currentCalendarGroup)

      currentCalendarGroup = []
      referenceCalendarEvent = currentCalendarEvent
      groupEnd = referenceCalendarEvent.end
    }
  }

  return calendarEvents
}

const formatCalendarGroupEvents = (calendarGroup: CalendarEvent[]): CalendarEvent[] => {
  const groupSize = calendarGroup.length
  calendarGroup.forEach((calendarEvent, index) => {
    calendarEvent.groupSize = groupSize
    calendarEvent.groupPosition = index
  })

  return calendarGroup
}

export const computeEventCalendarPositionX = (
  calendarEvent: CalendarEvent,
  windowWidth: number,
): number => {
  const { groupPosition, groupSize } = calendarEvent
  return (windowWidth / groupSize) * groupPosition
}

export const computeEventCalendarPositionY = (
  calendarEvent: CalendarEvent,
  windowHeight: number,
): number => {
  const { start } = calendarEvent

  const ratioY = windowHeight / CALENDAR_DAY_DURATION

  return (start - CALENDAR_DAY_START) * ratioY
}

export const computeEventCalendarWidth = (calendarEvent: CalendarEvent, windowWidth: number) => {
  const { groupSize } = calendarEvent

  return windowWidth / groupSize
}

export const computeEventCalendarHeight = (calendarEvent: CalendarEvent, windowHeight: number) => {
  const calendarEventDuration = calendarEvent.end - calendarEvent.start

  const ratioY = windowHeight / CALENDAR_DAY_DURATION
  return calendarEventDuration * ratioY
}
