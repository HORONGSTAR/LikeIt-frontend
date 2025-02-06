import backgroundImage from '../../images/register.jpg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { styled } from '@mui/system'

const Root = styled(Box)({
  display: 'flex',
  height: '100vh',
})

const LeftPanel = styled(Box)({
  flex: 1,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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

const SignupForm = styled(Box)({
  width: '100%',
  maxWidth: '350px',
  textAlign: 'center',
})

const StyledButton = styled(Button)({
  marginTop: '10px',
})

const Signup = () => {
  return (
    <Root>
      <LeftPanel />
      <RightPanel>
        <SignupForm>
          <img src={logo} alt='로고' width='200' height='60' />
          <Typography variant='body2' color='textSecondary' gutterBottom>
            회원가입 후 서비스를 이용할 수 있습니다.
          </Typography>

          <Link to='/commonsignup'>
            <StyledButton
              fullWidth
              variant='contained'
              sx={{ backgroundColor: '#000000', color: '#FFFFFF' }}
            >
              이메일로 회원가입
            </StyledButton>
          </Link>

          <StyledButton
            fullWidth
            variant='contained'
            sx={{ backgroundColor: '#FFF200', color: '#000000' }}
          >
            카카오 계정으로 회원가입
          </StyledButton>

          <StyledButton
            fullWidth
            variant='contained'
            sx={{ backgroundColor: '#FFFFFF', color: '#000000' }}
            startIcon={<GoogleIcon />}
          >
            구글 계정으로 회원가입
          </StyledButton>
        </SignupForm>
      </RightPanel>
    </Root>
  )
}

export default Signup
