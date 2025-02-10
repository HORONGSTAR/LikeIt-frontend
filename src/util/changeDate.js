export const setDDay = (endDate) => {
   const today = new Date()
   today.setHours(0, 0, 0, 0)
   const end = new Date(endDate)
   return Math.floor((end - today) / (1000 * 60 * 60 * 24))
}
