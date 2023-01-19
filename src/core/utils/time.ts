import moment from 'moment'

export const CALENDAR_DAY_START = process.env.REACT_APP_CALENDAR_DAY_START // in minutes
export const CALENDAR_DAY_END = process.env.REACT_APP_CALENDAR_DAY_END // in minutes
export const CALENDAR_DAY_DURATION = CALENDAR_DAY_END - CALENDAR_DAY_START // in minutes

export const parseTime = (time: string): number => {
  const dateTime = moment(time, 'h:m')
  const startOfDay = moment().startOf('day')

  return dateTime.diff(startOfDay, 'minutes')
}
