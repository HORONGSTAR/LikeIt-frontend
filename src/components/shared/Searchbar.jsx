import { Search as SearchIcon } from '@mui/icons-material'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { useState, useCallback } from 'react'

function Searchbar() {
   const [searchTerm, setSearchTerm] = useState('')

   const handleInputChange = useCallback((event) => {
      setSearchTerm(event.target.value)
   }, [])

   const handleSearch = useCallback(() => {
      if (searchTerm.trim() !== '') {
         setSearchTerm(searchTerm.trim())
      }
      window.location.href = `/search?searchTerm=${searchTerm}`
   }, [searchTerm])

   const handlekeyDown = (event) => {
      if (event.key === 'Enter') {
         handleSearch()
      }
   }

   const searchBox = (
      <TextField
         value={searchTerm}
         onChange={handleInputChange}
         onKeyDown={handlekeyDown}
         placeholder="프로젝트 검색"
         fullWidth
         variant="standard"
         aria-label="검색창"
         slotProps={{
            input: {
               startAdornment: (
                  <InputAdornment position="start">
                     <IconButton onClick={handleSearch}>
                        <SearchIcon fontSize="small" />
                     </IconButton>
                  </InputAdornment>
               ),
            },
         }}
      />
   )

   return searchBox
}

export default Searchbar
