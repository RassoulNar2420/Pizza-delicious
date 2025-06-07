import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  });


export const formatCurrency = (value) => {
    return formatter.format(value)
}

export const formatDateTime = (value, format = 'DD/MM/YYYY HH:mm') => {
    return dayjs(value).format(format)
}

export const formatTime = (value, format = 'HH:mm') => {
  return dayjs(value).format(format)
}

export const formatCalendar = (value, format = 'DD/MM/YYYY') => {
    return dayjs(value).format(format)
}
