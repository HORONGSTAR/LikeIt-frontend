import React from 'react'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { styled } from '@mui/system'
import backgroundImage from '../../images/login.jpg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Root = styled(Box)({
  display: 'flex',
  height: '100vh',
})

const LeftPanel = styled(Box)({
  flex: 1,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'contain',
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
  return (
    <Root>
      <LeftPanel />
      <RightPanel>
        <LoginForm>
          <img src={logo} alt='로고' width='200' height='60' />
          <Typography variant='body2' color='textSecondary' gutterBottom>
            로그인 후 신선한 아이디어를 만나보세요!
          </Typography>
          <TextField
            fullWidth
            label='이메일 주소'
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
            label='비밀번호'
            type='password'
            margin='normal'
            variant='outlined'
          />
          <StyledButton fullWidth variant='contained' color='primary'>
            로그인
          </StyledButton>
          <Typography variant='body2' marginTop='10px'>
            아직 계정이 없으신가요?{' '}
            <Button color='primary'>
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                회원가입
              </Link>
            </Button>
          </Typography>
          <Typography variant='body2'>
            비밀번호를 잊으셨나요?{' '}
            <Button color='primary'>비밀번호 재설정</Button>
          </Typography>
          <StyledButton
            fullWidth
            variant='contained'
            color='secondary'
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
