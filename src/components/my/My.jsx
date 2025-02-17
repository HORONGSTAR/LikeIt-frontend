import React, { useCallback, useState, useEffect } from 'react'
import { Avatar, Button, TextField, Tab, Typography, Box, Link } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Main, SubTitle, Stack2, TextLink, Dot, ModalBox, LoadingBox, ErrorBox, ImgUploadBox } from '../../styles/BaseStyles'
import { Tabs, TabLink } from '../../components/ui/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk } from '../../features/pageSlice'
import { changeEmailThunk, changePasswordThunk, registerUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

function My() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { user, loading, error } = useSelector((state) => state.page)
   const [email, setEmail] = useState('')
   const [currentPassword, setCurrentPassword] = useState('')
   const [passwordToChange, setPasswordToChange] = useState('')
   const [confirmPasswordToChange, setConfirmPasswordToChange] = useState('')

   const fetchProfileData = useCallback(() => {
      dispatch(getProfileThunk())
         .unwrap()
         .then()
         .catch((error) => {
            console.error('사용자 정보 가져오는 중 오류 발생:', error)
         })
   }, [dispatch])

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData])

   useEffect(() => {
      if (user && user.email) {
         setEmail(user.email)
      }
   }, [user])

   const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(email)
   }

   const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&)($])[A-Za-z\d@!%*#?&)($]{8,20}$/
      return passwordRegex.test(password)
   }

   const changeEmail = useCallback(() => {
      if (!email.trim()) {
         alert('변경할 이메일을 입력해주세요!')
         return
      }
      if (!validateEmail(email)) {
         alert('유효한 이메일을 입력해주세요!')
         return
      }

      dispatch(changeEmailThunk({ email }))
         .unwrap()
         .then(() => {
            alert('이메일이 성공적으로 수정되었습니다.')
            // window.location.href = '/my'
         })
         .catch((error) => {
            console.error('이메일 변경 중 오류 발생:', error)
            alert('이메일 변경에 실패했습니다.')
         })
   }, [dispatch, email])

   const changePassword = useCallback(() => {
      if (!currentPassword.trim() || !passwordToChange.trim() || !confirmPasswordToChange.trim()) {
         alert('모든 입력란을 빠짐없이 입력해주세요!')
         return
      }
      if (!validatePassword(passwordToChange)) {
         alert('비밀번호는 8~20 자리이고, 영문자와 특수문자를 포함해야 합니다!')
         return
      }
      if (passwordToChange !== confirmPasswordToChange) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }
      dispatch(changePasswordThunk({ currentPassword, passwordToChange }))
         .unwrap()
         .then(() => {
            alert('비밀번호가 변경되었습니다!')
            window.location.href = '/my'
         })
         .catch((error) => {
            console.error('비밀번호 변경 에러:', error)
         })
   }, [dispatch, currentPassword, passwordToChange, confirmPasswordToChange])

   const handleSubmit = useCallback(() => {})

   const handleImageChange = useCallback(() => {})

   const sponsorList = (
      <>
         <>후원내역</>
      </>
   )

   const accountSetting = (
      <>
         {/* Email Update */}
         <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  이메일 주소 변경
               </Typography>
               <TextField variant="outlined" margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
               <Button variant="contained" color="inherit" onClick={changeEmail}>
                  변경
               </Button>
            </Box>
         </Box>

         {/* Password Change */}
         <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
               비밀번호 변경
            </Typography>
            <TextField fullWidth variant="outlined" margin="dense" label="현재 비밀번호" type="password" onChange={(e) => setCurrentPassword(e.target.value)} />
            <Stack2 spacing={1}>
               <Typography variant="body2">비밀번호를 잊으셨나요?</Typography>
               <TextLink variant="body2" color="orenge" to="/findingpassword">
                  비밀번호 재설정
               </TextLink>
            </Stack2>
            <TextField fullWidth variant="outlined" margin="dense" label="변경할 비밀번호" type="password" onChange={(e) => setPasswordToChange(e.target.value)} />
            <TextField fullWidth variant="outlined" margin="dense" label="변경할 비밀번호 확인" type="password" onChange={(e) => setConfirmPasswordToChange(e.target.value)} />
         </Box>

         {/* Save/Cancel Buttons */}
         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={changePassword}>
               비밀번호 변경
            </Button>
            {/* <Button variant="outlined" color="inherit">
               취소
            </Button> */}
         </Box>
      </>
   )

   const tabItems = [
      { label: '후원 내역', page: sponsorList },
      { label: '계정 설정', page: accountSetting },
   ]

   return (
      <Main>
         <Box>
            {/* Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
               <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                  <img src="https://via.placeholder.com/64" alt="profile" />
               </Avatar>
               <Box>
                  <Typography variant="h6">{user ? user.name : ''}</Typography>
                  <Typography variant="body2" color="text.secondary">
                     가입일 2023.06.02 | 후기 작성 3건 | 후원 횟수 22회
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     후원 순위 최고 기록 593위
                  </Typography>
                  {/* <Button variant="outlined" startIcon={<EditIcon />} sx={{ mt: 1 }}>
                     프로필 수정
                  </Button> */}
                  <ModalBox
                     openBtn={
                        <Button variant="outlined" startIcon={<EditIcon />} sx={{ mt: 1 }}>
                           프로필 수정
                        </Button>
                     }
                     closeBtn
                  >
                     <Typography variant="h5">프로필 수정</Typography>
                     <ImgUploadBox />
                     <Button variant="outlined"> 등록 </Button>
                  </ModalBox>
               </Box>
            </Box>
            <Tabs tabItems={tabItems} />
         </Box>
      </Main>
   )
}

export default My
