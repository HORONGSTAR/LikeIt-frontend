import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmailThunk } from '../../features/authSlice'
import { TextField, Button, Typography, Stack, Divider, Box } from '@mui/material'
import { Stack2, TextLink, Dot } from '../../styles/BaseStyles'
import { useNavigate } from 'react-router-dom'

function FindingEmail() {
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const { email, loading, error } = useSelector((state) => state.auth)
   const [foundEmail, setFoundEmail] = useState('')

   const handleSendPhone = () => {
      const trimmedPhone = phone.replace(/\s/g, '')
      dispatch(fetchEmailThunk({ trimmedPhone }))
         .unwrap()
         .then()
         .catch((error) => {
            console.error('로그인 실패:', error)
            alert(error)
         })
   }

   useEffect(() => {
      setFoundEmail(email) // Set state on success
   }, [email])

   return (
      <Stack width={300} spacing={2}>
         <Stack2 justifyContent="left">
            <Box>
               <Typography align="left" sx={{ fontWeight: 'bold' }}>
                  이메일 찾기
               </Typography>
               <Typography align="left">전화번호를 입력해주세요.</Typography>
            </Box>
         </Stack2>

         <TextField fullWidth label="전화번호" margin="normal" variant="outlined" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

         <Button onClick={handleSendPhone} fullWidth variant="contained">
            이메일 찾기
         </Button>

         {foundEmail && (
            <Stack width={300} spacing={2}>
               <Stack2 justifyContent="left">
                  <Box>
                     <Typography align="left" sx={{ fontWeight: 'bold' }}>
                        이메일 : {foundEmail}
                     </Typography>
                  </Box>
               </Stack2>
            </Stack>
         )}
      </Stack>
   )
}

export default FindingEmail
