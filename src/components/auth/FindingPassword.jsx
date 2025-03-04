import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTempPasswordThunk } from '../../features/authSlice'
import { TextField, Button, Typography, Stack, Divider } from '@mui/material'
import { Stack2, TextLink, Dot } from '../../styles/BaseStyles'
import { useNavigate } from 'react-router-dom'
import { LoadingBox, ErrorBox } from '../../styles/BaseStyles'

const FindingPassword = () => {
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

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

   if (loading)
      return (
         <>
            <LoadingBox />
         </>
      )
   if (error)
      return (
         <>
            <ErrorBox />
         </>
      )

   return (
      <Stack width={300} spacing={2}>
         <Stack2 justifyContent="left">
            <Typography align="center" sx={{ fontWeight: 'bold' }}>
               비밀번호 재설정
            </Typography>
            <Typography align="left">가입하신 이메일로 임시 비밀번호를 보내드려요.</Typography>
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

export default FindingPassword
