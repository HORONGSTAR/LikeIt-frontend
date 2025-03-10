import { Link } from 'react-router-dom'
import { Stack, Button, Typography } from '@mui/material'
import { Dot, Stack2 } from '../../styles/BaseStyles'

const Signup = () => {
   const googleLoginOrSignup = () => {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`
   }

   const kakaoLoginOrSignup = () => {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`
   }

   return (
      <Stack width={300} spacing={2}>
         <Stack2 justifyContent="center">
            <Dot />
            <Typography>회원가입 후 서비스를 이용할 수 있습니다</Typography>
            <Dot />
         </Stack2>
         <Button component={Link} to={'/commonsignup'} fullWidth variant="contained">
            이메일로 회원가입
         </Button>
         <Button onClick={kakaoLoginOrSignup} variant="contained" sx={{ background: '#F9E000', color: '#3A1D1D' }} startIcon={<img src="/images/icon/kakao.svg" alt="kakao" />}>
            카카오 계정으로 회원가입
         </Button>
         <Button onClick={googleLoginOrSignup} variant="outlined" startIcon={<img src="/images/icon/google.svg" alt="google" />}>
            구글 계정으로 회원가입
         </Button>
      </Stack>
   )
}

export default Signup
