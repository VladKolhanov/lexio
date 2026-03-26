import { useEffect, useState } from "react"

export function useTimer(timeMs: number) {
  const [timer, setTimer] = useState(timeMs)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interval)
      } else {
        setTimer((prev) => prev - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  return { timer, setTimer }
}
