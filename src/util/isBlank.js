export const isBlank = (items = []) => {
   const result = items.filter((item) => !(typeof item === 'string' ? item.trim() : item))
   return result.length > 0 ? true : false
}
