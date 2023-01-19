const startTimeRegexp = /^([0-9]|[01][0-9]|2[0-3]):[0-5][0-9]$/

export const eventsResponseValidator = (data: any): boolean => {
  if (!Array.isArray(data)) {
    return false
  }

  for (let i = 0; i < data.length; i++) {
    const event = data[i]

    if (typeof event.id !== 'number') {
      return false
    }

    if (typeof event.start !== 'string' || !startTimeRegexp.test(event.start)) {
      return false
    }

    if (typeof event.duration !== 'number' || event.duration < 0) {
      return false
    }
  }

  return true
}
