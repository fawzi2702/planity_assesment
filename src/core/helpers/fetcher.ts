export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  try {
    const response = await fetch(input, init)

    if (response.ok) {
      const data = await response.json()
      return Promise.resolve<T>(data)
    } else {
      return Promise.reject(new Error())
    }
  } catch (error) {
    return Promise.reject(new Error())
  }
}
