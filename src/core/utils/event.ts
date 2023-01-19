import { CalendarEvent, CalendarEventCluster, CalendarEventHistogram } from '../types/event.type'
import { CALENDAR_DAY_DURATION } from './time'

/*
 *    RENDER
 */

export const computeEventCalendarPositionX = (
  calendarEvent: CalendarEvent,
  windowWidth: number,
): number => {
  const { widthDivider, horizontalPostionIndex } = calendarEvent
  return (windowWidth / widthDivider) * horizontalPostionIndex
}

export const computeEventCalendarPositionY = (
  calendarEvent: CalendarEvent,
  windowHeight: number,
): number => {
  const { start } = calendarEvent

  const ratioY = windowHeight / CALENDAR_DAY_DURATION

  return start * ratioY
}

export const computeEventCalendarWidth = (
  calendarEvent: CalendarEvent,
  windowWidth: number,
): number => {
  const { widthDivider } = calendarEvent

  return windowWidth / widthDivider
}

export const computeEventCalendarHeight = (
  calendarEvent: CalendarEvent,
  windowHeight: number,
): number => {
  const calendarEventDuration = calendarEvent.end - calendarEvent.start

  const ratioY = windowHeight / CALENDAR_DAY_DURATION
  return calendarEventDuration * ratioY
}

/*
 *    ALGORITHM
 */

export const computeCalendarEventsLayout = (calendarEvents: CalendarEvent[]): CalendarEvent[] => {
  const calendarEventHistogram = generateCalendarEventHistogram(calendarEvents)

  const calendarEventMap = generateCalendarEventMap(calendarEvents)
  const calendarEventClusters = generateCalendarEventsClusters(
    calendarEventHistogram,
    calendarEventMap,
  )

  setClusterCalendarEventsHorizontalPosition(calendarEventClusters)

  return calendarEvents
}

const generateCalendarEventMap = (calendarEvents: CalendarEvent[]): Map<number, CalendarEvent> => {
  const calendarEventMap = new Map<number, CalendarEvent>()

  calendarEvents.forEach((calendarEvent) => {
    calendarEventMap.set(calendarEvent.id, calendarEvent)
  })

  return calendarEventMap
}

const generateCalendarEventHistogram = (
  calendarEvents: CalendarEvent[],
): CalendarEventHistogram => {
  const histogram: number[][] = []
  for (let minute = 0; minute < CALENDAR_DAY_DURATION; minute++) {
    histogram[minute] = []
  }

  calendarEvents.forEach((calendarEvent) => {
    for (let time = calendarEvent.start; time < calendarEvent.end; time++) {
      histogram[time].push(calendarEvent.id)
    }
  })

  return histogram
}

const generateCalendarEventsClusters = (
  histogram: number[][],
  calendarEventsMap: Map<number, CalendarEvent>,
): CalendarEventCluster[] => {
  const clusters: CalendarEventCluster[] = []
  let cluster: CalendarEventCluster = null

  histogram.forEach((minute) => {
    if (minute.length > 0) {
      if (cluster === null) {
        cluster = {
          eventsMap: new Map<number, CalendarEvent>(),
          maxSimultaneousOverlaps: 1,
        }
      }

      minute.forEach((calendarEventId) => {
        const calendarEvent = calendarEventsMap.get(calendarEventId)

        if (!cluster.eventsMap.has(calendarEventId)) {
          cluster.eventsMap.set(calendarEventId, calendarEvent)
        }

        let simultaneousOverlaps = calendarEvent.overlapsEvents.size
        if (minute.length > calendarEvent.overlapsEvents.size) {
          minute.forEach((overlapseEventId) => {
            if (
              overlapseEventId === calendarEventId ||
              calendarEvent.overlapsEvents.has(overlapseEventId)
            ) {
              return
            }

            const overlapsEvent = calendarEventsMap.get(overlapseEventId)
            calendarEvent.overlapsEvents.set(overlapseEventId, overlapsEvent)
          })

          simultaneousOverlaps = minute.length
        }

        if (simultaneousOverlaps > cluster.maxSimultaneousOverlaps) {
          cluster.maxSimultaneousOverlaps = simultaneousOverlaps
        }
      })
    } else if (cluster !== null) {
      clusters.push(cluster)
      cluster = null
    }
  })

  if (cluster !== null) {
    clusters.push(cluster)
  }

  return clusters
}

const setClusterCalendarEventsHorizontalPosition = (
  calendarEventClusters: CalendarEventCluster[],
) => {
  calendarEventClusters.forEach((calendarEventCluster) => {
    calendarEventCluster.eventsMap.forEach((calendarEvent) => {
      const availablePositionsArray: boolean[] = new Array(
        calendarEventCluster.maxSimultaneousOverlaps,
      ).fill(true, 0, calendarEventCluster.maxSimultaneousOverlaps)

      calendarEvent.overlapsEvents.forEach((overlapsEvent) => {
        if (overlapsEvent.horizontalPostionIndex !== null) {
          availablePositionsArray[overlapsEvent.horizontalPostionIndex] = false
        }
      })

      let horizontalPositionIndex: number = null
      for (let i = 0; i < availablePositionsArray.length && horizontalPositionIndex === null; i++) {
        const positionIsAvailable = availablePositionsArray[i]
        if (positionIsAvailable) {
          horizontalPositionIndex = i
        }
      }

      calendarEvent.horizontalPostionIndex = horizontalPositionIndex
      if (calendarEvent.overlapsEvents.size === 0) {
        calendarEvent.widthDivider = 1
      } else {
        calendarEvent.widthDivider = calendarEventCluster.maxSimultaneousOverlaps
      }
    })
  })
}
