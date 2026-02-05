export const getItem = <TItem = unknown>(key: string) => {
  if (typeof window === 'undefined') return null
  const item = window.localStorage.getItem(key)

  if (!item) return null

  return JSON.parse(item) as TItem
}

export const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

export const clear = () => {
  window.localStorage.clear()
}
