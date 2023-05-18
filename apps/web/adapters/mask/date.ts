import dayjs from 'dayjs'

export function militaryDate(date: Date) {
  return dayjs(date).format('DD/MM/YYYY')
}
