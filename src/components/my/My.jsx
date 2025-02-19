import React, { useCallback, useState, useEffect } from 'react'
import { Avatar, Button, TextField, Tab, Typography, Box, Link } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { Main, SubTitle, Stack2, TextLink, Dot, ModifiedModalBox, LoadingBox, ErrorBox, ImgUploadBox } from '../../styles/BaseStyles'
import { Tabs, TabLink } from '../../components/ui/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmailThunk, changePasswordThunk, registerUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { updateProfileThunk } from '../../features/pageSlice'

function My({ initialValues = {} }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   console.log(initialValues)

   const [email, setEmail] = useState(initialValues ? initialValues.email : '')
   const [currentPassword, setCurrentPassword] = useState('')
   const [passwordToChange, setPasswordToChange] = useState('')
   const [confirmPasswordToChange, setConfirmPasswordToChange] = useState('')
   const [imgFile, setImgFile] = useState(null) //이미지 파일 객체
   const [imgUrl, setImgUrl] = useState(initialValues ? process.env.REACT_APP_API_URL + '/userImg' + initialValues.imgUrl : '') //이미지 경로(파일명 포함)
   //    const [imgUrl, setImgUrl] = useState('') //이미지 경로(파일명 포함)
   const [nickname, setNickname] = useState(initialValues ? initialValues.name : '')

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

   const handleSubmit = useCallback(() => {
      if (!nickname.trim()) {
         alert('닉네임을 입력하세요')
         return
      }
      if (!imgFile) {
         alert('이미지 파일을 추가하세요')
         return
      }
      const formData = new FormData()
      formData.append('name', nickname)

      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         formData.append('img', encodedFile)
      }
      dispatch(updateProfileThunk(formData))
         .unwrap()
         .then(() => {
            alert('프로필이 수정되었습니다!')
            window.location.href = '/my'
         })
         .catch((error) => {
            console.error('프로필 수정 에러:', error)
         })
   }, [nickname, imgFile, dispatch])

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

   const pointList = (
      <>
         <>포인트내역</>
      </>
   )

   const tabItems = [
      { label: '후원 내역', page: sponsorList },
      { label: '계정 설정', page: accountSetting },
      { label: '포인트 내역', page: pointList },
   ]

   return (
      <Main>
         <Box>
            {/* Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
               <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                  <img src={initialValues ? process.env.REACT_APP_API_URL + '/userImg' + initialValues.imgUrl : ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
               </Avatar>
               <Box>
                  <Typography variant="h6">{initialValues ? initialValues.name : ''}</Typography>
                  <Typography variant="body2" color="text.secondary">
                     가입일 {initialValues ? initialValues.createdAt : ''} | 후기 작성 3건 | 후원 횟수 22회
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     후원 순위 최고 기록 593위
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                     <ModifiedModalBox openBtn={<Button startIcon={<EditIcon />}>프로필 수정</Button>} closeBtn>
                        <Typography variant="h5">프로필 수정</Typography>
                        <Box sx={{ mt: 2 }}>
                           <Typography variant="h7">프로필 사진</Typography>
                           <ImgUploadBox setImgFile={setImgFile} imgUrl={imgUrl} setImgUrl={setImgUrl} />

                           <Typography variant="h7">닉네임</Typography>
                           <TextField fullWidth variant="outlined" margin="dense" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                           <Button variant="outlined" onClick={handleSubmit}>
                              등록
                           </Button>
                        </Box>
                     </ModifiedModalBox>
                     <ModifiedModalBox openBtn={<Button startIcon={<PostAddIcon />}>창작자 정보 추가</Button>} closeBtn>
                        <Typography sx={{ fontSize: 20 }}>창작자 정보 추가</Typography>
                        <Typography sx={{ fontSize: 14 }}>활동 분야(복수 선택 가능)</Typography>
                        <Box sx={{ mt: 2 }}>
                           <Button variant="outlined" onClick={handleSubmit}>
                              등록
                           </Button>
                        </Box>
                     </ModifiedModalBox>
                  </Box>
               </Box>
            </Box>
            <Tabs tabItems={tabItems} />
         </Box>
      </Main>
   )
}

export default My
