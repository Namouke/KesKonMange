
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

