export function formatDate(date: string) {
  const parsedDate = new Date(date)

  const day = parsedDate.getDate()
  const month = parsedDate.getMonth()
  const year = parsedDate.getFullYear()
  const hour = parsedDate.getHours()
  const minute = parsedDate.getMinutes()

  const formatDate = [day, (month + 1), year]
    .map(unit => String(unit).padStart(2, '0'))
    .join('/')

  const formatTime = [hour, minute]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')


  const formatDateTime = `${formatDate} ${formatTime}`

  if (formatDateTime.indexOf('NaN') === -1) return formatDateTime;
  else return '01/01/2000 00:00'
}