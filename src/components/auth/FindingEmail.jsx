import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setTempPasswordThunk } from '../../features/authSlice'
import { TextField, Button, Typography, Stack, Divider, Box } from '@mui/material'
import { Stack2, TextLink, Dot } from '../../styles/BaseStyles'
import { useNavigate } from 'react-router-dom'

function FindingEmail() {
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSendEmail = useCallback(
      (e) => {
         e.preventDefault()
         dispatch(setTempPasswordThunk({ email }))
            .unwrap()
            .then(() => {
               navigate('/login')
               alert('이메일로 임시비밀번호를 보냈습니다!')
            })
            .catch((error) => {
               console.error('로그인 실패:', error)
               alert(error)
            })
      },
      [dispatch, navigate, email]
   )

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
         <form onSubmit={handleSendEmail}>
            <TextField fullWidth label="이메일 주소" margin="normal" variant="outlined" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button fullWidth variant="contained" type="submit">
               이메일 보내기
            </Button>
         </form>
      </Stack>
   )
}

export default FindingEmail
