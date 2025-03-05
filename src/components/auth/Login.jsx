import { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { TextField, Button, Typography, Stack, Divider } from '@mui/material'
import { Stack2, TextLink, Dot } from '../../styles/BaseStyles'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorBox, LoadingBox } from '../../styles/BaseStyles'

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const googleLoginOrSignup = () => {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`
   }

   const kakaoLoginOrSignup = () => {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`
   }

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/'))
               .catch(() => {})
         }
      },
      [dispatch, navigate, email, password]
   )

   if (error)
      return (
         <>
            <Typography sx={{ color: 'red' }}>{error}</Typography>
            <Typography>
               <Link to="/">홈으로 돌아가기</Link>
            </Typography>
         </>
      )

   return (
      <Stack width={300} spacing={2}>
         <Stack2 justifyContent="center">
            <Dot />
            <Typography align="center">로그인 후 신선한 아이디어를 만나보세요!</Typography>
            <Dot />
         </Stack2>
         <form onSubmit={handleLogin}>
            <TextField fullWidth label="이메일 주소" margin="normal" variant="outlined" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="비밀번호" type="password" margin="normal" variant="outlined" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" type="submit">
               로그인
            </Button>
         </form>

         <Stack spacing={0.5}>
            <Stack2 spacing={1}>
               <Typography variant="body2">아직 계정이 없으신가요?</Typography>
               <TextLink variant="body2" color="orenge" to="/signup">
                  회원가입
               </TextLink>
            </Stack2>
            <Stack2 spacing={1}>
               <Typography variant="body2">가입한 이메일을 잊으셨나요?</Typography>
               <TextLink variant="body2" color="orenge" to="/findingemail">
                  이메일 찾기
               </TextLink>
            </Stack2>
            <Stack2 spacing={1}>
               <Typography variant="body2">비밀번호를 잊으셨나요?</Typography>
               <TextLink variant="body2" color="orenge" to="/findingpassword">
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
            <Button onClick={kakaoLoginOrSignup} variant="contained" sx={{ background: '#F9E000', color: '#3A1D1D' }} startIcon={<img src="/images/icon/kakao.svg" alt="kakao" />}>
               카카오 로그인
            </Button>
            <Button onClick={googleLoginOrSignup} variant="outlined" startIcon={<img src="/images/icon/google.svg" alt="google" />}>
               구글 로그인
            </Button>
         </Stack2>
      </Stack>
   )
}

export default Login
