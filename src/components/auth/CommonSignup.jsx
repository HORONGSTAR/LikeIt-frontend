import backgroundImage from '../../images/register.jpg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { React, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { styled } from '@mui/system'
import { registerUserThunk } from '../../features/authSlice'

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

const CommonSignup = () => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입 완료 상태 추가
  const dispatch = useDispatch()

  const validatePhone = (phone) => {
    const phoneRegex1 = /^\d{11}$/ //true로 반환돼야 좋은거
    const phoneRegex2 = /[^0-9]/ //false로 반환돼야 좋은거
    const boolResult = phoneRegex1.test(phone) && !phoneRegex2.test(phone)
    return boolResult
  }

  const handleCommonSignup = useCallback(() => {
    if (
      !email.trim() ||
      !phone.trim() ||
      !nickname.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert('모든 필드를 입력해주세요!')
      return
    }
    if (!validatePhone(phone)) {
      alert('유효한 전화번호를 입력해주세요!')
    }

    // dispatch(registerUserThunk({ email, phone, nickname, password }))
    //   .unwrap()
    //   .then(() => {
    //     //회원가입 성공시
    //     setIsSignupComplete(true)
    //   })
    //   .catch((error) => {
    //     // 회원가입중 에러 발생시
    //     console.error('회원가입 에러:', error)
    //   })
  }, [email, phone, nickname, password, confirmPassword])

  //회원가입이 완료 되었을 때
  if (isSignupComplete) {
    return (
      <Container maxWidth='sm'>
        <Typography variant='h4' gutterBottom align='center'>
          회원가입이 완료되었습니다!
        </Typography>
        <Typography
          variant='body1'
          align='center'
          style={{ marginTop: '20px' }}
        >
          로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={() => (window.location.href = '/login')} // 로그인 페이지로 이동
        >
          로그인 하러 가기
        </Button>
      </Container>
    )
  }

  return (
    <Root>
      <LeftPanel />
      <RightPanel>
        <SignupForm>
          <img src={logo} alt='로고' width='200' height='60' />
          <Typography variant='body2' color='textSecondary' gutterBottom>
            이메일로 회원가입
          </Typography>

          <TextField
            label='이메일 주소'
            variant='outlined'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            // inputProps={{ maxLength: 11, inputMode: 'numeric' }}
            label='연락처'
            variant='outlined'
            type='text'
            fullWidth
            margin='dense'
            value={phone}
            onChange={setPhone}
          />
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ fontSize: '10px' }}
            align='center'
          >
            숫자만 입력하세요.
          </Typography>

          <TextField
            label='닉네임'
            variant='outlined'
            fullWidth
            margin='dense'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <TextField
            label='비밀번호'
            variant='outlined'
            type='password'
            fullWidth
            margin='dense'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ fontSize: '10px' }}
          >
            비밀번호는 영문, 숫자, 특수문자를 포함하여 공백 없이 8~20자로 입력.
          </Typography>

          <TextField
            label='비밀번호 확인'
            variant='outlined'
            type='password'
            fullWidth
            margin='dense'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton
            fullWidth
            variant='contained'
            sx={{ backgroundColor: '#000000', color: '#FFFFFF' }}
            onClick={handleCommonSignup}
          >
            회원가입
          </StyledButton>
        </SignupForm>
      </RightPanel>
    </Root>
  )
}

export default CommonSignup
//ㅠㅠ 왜 안되지
