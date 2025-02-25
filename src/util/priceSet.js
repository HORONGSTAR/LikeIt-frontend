export const formatWithComma = (value) => {
   if (!value) return ''
   return Number(value.replace(/,/g, '')).toLocaleString('ko-KR')
}

export const stripComma = (value) => {
   return value.replace(/,/g, '')
}
