export const prepareSortObject = (field) => {
  const sortKey = field.replace('-','')
  const sortDirection = field[0] === '-' ? 'desc' : 'asc'
  const sortObj = {}
  sortObj[sortKey] = sortDirection

  return sortObj
}
