import React from 'react'
import { TextField, Button, Typography, Stack, Divider } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { Stack2, TextLink, Dot } from '../../styles/BaseStyles'

function Login() {
   return (
      <Stack width={300} spacing={2}>
         <Stack2 justifyContent="center">
            <Dot />
            <Typography align="center">로그인 후 신선한 아이디어를 만나보세요!</Typography>
            <Dot />
         </Stack2>
         <TextField fullWidth label="이메일 주소" />
         <TextField fullWidth label="비밀번호" type="password" />
         <Button fullWidth variant="contained">
            로그인
         </Button>
         <Stack spacing={0.5}>
            <Stack2 spacing={1}>
               <Typography variant="body2">아직 계정이 없으신가요?</Typography>
               <TextLink variant="body2" color="orenge" to="/signup">
                  회원가입
               </TextLink>
            </Stack2>
            <Stack2 spacing={1}>
               <Typography variant="body2">비밀번호를 잊으셨나요?</Typography>
               <TextLink variant="body2" color="orenge" to="/">
                  비밀번호 재설정
               </TextLink>
            </Stack2>
         </Stack>
         <Divider>
            <Typography variant="caption" color="grey">
               다른 방법으로 로그인
            </Typography>
         </Divider>
         <Stack2 justifyContent="center">
            <Button variant="contained" sx={{ background: '#F9E000', color: '#3A1D1D' }} startIcon={<img src="/images/icon/kakao.svg" alt="kakao" />}>
               카카오 로그인
            </Button>
            <Button variant="outlined" startIcon={<img src="/images/icon/google.svg" alt="google" />}>
               구글 로그인
            </Button>
         </Stack2>
      </Stack>
   )
}

export default Login
