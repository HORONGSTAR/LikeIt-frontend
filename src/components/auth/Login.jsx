import React, { useState, useMemo, useCallback } from 'react'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { styled } from '@mui/system'
import backgroundImage from '../../images/login.jpg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'

const Root = styled(Box)({
  display: 'flex',
  height: '100vh',
})

const LeftPanel = styled(Box)({
  flex: 1,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
})

const RightPanel = styled(Container)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '20px',
})

const LoginForm = styled(Box)({
  width: '100%',
  maxWidth: '350px',
  textAlign: 'center',
})

const StyledButton = styled(Button)({
  marginTop: '10px',
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const { loading, error } = useSelector((state) => state.auth)

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      if (email.trim() && password.trim()) {
        dispatch(loginUserThunk({ email, password }))
          .unwrap()
          .then(() => navigate('/'))
          .catch((error) => {
            console.error('로그인실패:', error)
            alert(error)
          })
      }
    },
    [dispatch, navigate, email, password]
  )

  return (
    <Root>
      <LeftPanel />
      <RightPanel>
        <LoginForm>
          <img src={logo} alt='로고' width='200' height='60' />
          <Typography variant='body2' color='textSecondary' gutterBottom>
            로그인 후 신선한 아이디어를 만나보세요!
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label='이메일 주소'
              margin='normal'
              variant='outlined'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label='비밀번호'
              type='password'
              margin='normal'
              variant='outlined'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
            >
              로그인
            </StyledButton>
          </form>
          <Typography variant='body2' marginTop='10px'>
            아직 계정이 없으신가요?{' '}
            <Button color='primary'>
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: 'orange' }}
              >
                회원가입
              </Link>
            </Button>
          </Typography>
          <Typography variant='body2'>
            비밀번호를 잊으셨나요?{' '}
            <Button color='primary'>
              <Link style={{ textDecoration: 'none', color: 'orange' }}>
                비밀번호 재설정
              </Link>
            </Button>
          </Typography>
          <StyledButton
            fullWidth
            variant='contained'
            color='secondary'
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: 2,
            }}
            startIcon={<GoogleIcon />}
          >
            구글 로그인
          </StyledButton>
        </LoginForm>
      </RightPanel>
    </Root>
  )
}

export default Login
