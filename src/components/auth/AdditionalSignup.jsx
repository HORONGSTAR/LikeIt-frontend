import { Link, useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Typography, Container } from '@mui/material'
import { Dot, Stack2 } from '../../styles/BaseStyles'
import { useDispatch, useSelector } from 'react-redux'
import { React, useCallback, useState } from 'react'
import Navber from '../../components/shared/Navber'
import { styled } from '@mui/system'
import { snsRegisterUserThunk } from '../../features/authSlice'
import { ErrorBox, LoadingBox } from '../../styles/BaseStyles'

const AdditionalSignup = () => {
   const StyledButton = styled(Button)({
      marginTop: '10px',
   })
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const { isSignupComplete, loading, error } = useSelector((state) => state.auth)
   const [errorOpen, setErrorOpen] = useState(false)

   const validatePhone = (phone) => {
      const phoneRegex1 = /^\d{11}$/ //true로 반환돼야 좋은거 - 길이 11인지 확인
      const phoneRegex2 = /[^0-9]/ //false로 반환돼야 좋은거 - 숫자만 쓰였는지 확인
      const boolResult = phoneRegex1.test(phone) && !phoneRegex2.test(phone)
      return boolResult
   }

   const handleAdditionalSignup = useCallback(
      (e) => {
         e.preventDefault() // 폼 제출 시 새로고침 방지

         if (!phone.trim()) {
            alert('연락처를 입력해주세요!')
            return
         }
         if (!validatePhone(phone)) {
            alert('유효한 연락처를 입력해주세요!')
            return
         }

         dispatch(snsRegisterUserThunk({ phone }))
            .unwrap()
            .then()
            .catch(() => setErrorOpen(true))
      },
      [phone]
   )

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   //회원가입이 완료 되었을 때
   if (isSignupComplete) {
      return (
         <>
            <Container maxWidth="sm" sx={{ mt: 5 }}>
               <Typography variant="h4" gutterBottom align="center">
                  회원가입이 완료되었습니다!
               </Typography>
               <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
                  로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.
               </Typography>
               <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px' }}
                  onClick={() => (window.location.href = '/login')} // 로그인 페이지로 이동
               >
                  로그인 하러 가기
               </Button>
            </Container>
         </>
      )
   }

   return (
      <form onSubmit={handleAdditionalSignup}>
         <Stack width={300} spacing={2}>
            <Stack2 justifyContent="center">
               <Dot />
               <Typography>회원가입 추가정보 입력.</Typography>
               <Dot />
            </Stack2>
            <TextField label="연락처" variant="outlined" type="text" fullWidth margin="dense" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '10px' }} align="center">
               숫자만 입력하세요.
            </Typography>

            <StyledButton type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
               회원가입
            </StyledButton>
         </Stack>
      </form>
   )
}

export default AdditionalSignup
