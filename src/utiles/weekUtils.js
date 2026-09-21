
export function getWeekDate(weekOffset, dayIndex = 0) {
  const today = new Date()
  const currentDay = today.getDay()
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay

  const date = new Date(today)
  date.setDate(
    today.getDate() + mondayOffset + dayIndex + weekOffset * 7,
  )

  return date
}

export function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}