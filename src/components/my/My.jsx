import React, { useCallback, useState, useEffect } from 'react'
import { Avatar, Button, TextField, Typography, Box, Link, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { Main, Stack2, TextLink, ModifiedModalBox, LoadingBox, ErrorBox, ImgUploadBox, FundingCard } from '../../styles/BaseStyles'
import { styled } from '@mui/system'
import CreateIcon from '@mui/icons-material/Create'
import { Tabs } from '../../components/ui/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmailThunk, changePasswordThunk, registerUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { updateCategoryThunk, updateProfileThunk } from '../../features/pageSlice'

const StyledPaper = styled(Paper)({
   display: 'flex',
   alignItems: 'center',
   padding: '16px',
   backgroundColor: '#E7F2E7',
   borderRadius: '8px',
})

const IconWrapper = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   width: 50,
   height: 50,
   backgroundColor: 'white',
   borderRadius: '8px',
   marginRight: '16px',
})

function My({ initialValues = {}, userWithOrders = {}, points = {} }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [email, setEmail] = useState(initialValues ? initialValues.email : '')
   const [currentPassword, setCurrentPassword] = useState('')
   const [passwordToChange, setPasswordToChange] = useState('')
   const [confirmPasswordToChange, setConfirmPasswordToChange] = useState('')
   const [imgFile, setImgFile] = useState(null) //이미지 파일 객체
   const [imgUrl, setImgUrl] = useState(initialValues ? process.env.REACT_APP_API_URL + '/userImg' + initialValues.imgUrl : '')
   const [nickname, setNickname] = useState(initialValues ? initialValues.name : '')

   //창작자 정보 추가부분
   const [selectedValues, setSelectedValues] = useState({
      food: false,
      pets: false,
      art: false,
      books: false,
      beauty: false,
      clothing: false,
      living: false,
      photography: false,
      performance: false,
   })

   const categoriesFromServer = initialValues ? initialValues?.Creator?.Categories : []
   console.log(categoriesFromServer)
   useEffect(() => {
      if (categoriesFromServer?.length > 0) {
         setSelectedValues((prev) => {
            const updatedValues = { ...prev }
            categoriesFromServer.forEach((category) => {
               if (updatedValues.hasOwnProperty(category.categoryName)) {
                  updatedValues[category.categoryName] = true
               }
            })
            return updatedValues
         })
      }
   }, [categoriesFromServer])

   // Handle checkbox change
   const handleChange = useCallback((event) => {
      setSelectedValues((prev) => ({
         ...prev,
         [event.target.name]: event.target.checked,
      }))
   }, [])

   const handleCategorySubmit = useCallback(() => {
      setSelectedValues((prev) => {
         const selectedKeys = Object.keys(prev).filter((key) => prev[key])
         dispatch(updateCategoryThunk(selectedKeys))
            .unwrap()
            .then(() => {
               alert('카테고리가 성공적으로 변경되었습니다.')
               window.location.href = '/my'
            })
            .catch((error) => {
               console.error('카테고리 변경 중 오류 발생:', error)
               alert('카테고리 변경에 실패했습니다.')
            })

         return prev // Prevents unnecessary re-renders
      })
   }, [dispatch])

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
            window.location.href = '/my'
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
         {userWithOrders
            ? userWithOrders.Orders?.map((order) => (
                 <>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                       주문일 {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <FundingCard image={process.env.REACT_APP_API_URL + '/projectImg' + order.Project.imgUrl} title={order.Project.title} price={order.orderPrice} status={order.orderStatus} />
                 </>
              ))
            : ''}
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
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
         <Typography variant="h6" fontWeight="bold">
            포인트 내역
         </Typography>
         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            총 포인트 {initialValues?.point}P
         </Typography>

         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {points.map((point, index) => (
               <Box
                  key={index}
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     p: 2,
                     borderBottom: '1px solid #ddd',
                  }}
               >
                  <Typography variant="body1" color="text.secondary">
                     {new Date(point.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">{point.changeComment}</Typography>
                  <Typography variant="h6" fontWeight="bold">
                     {point.changePoint}
                  </Typography>
               </Box>
            ))}
         </Box>
      </Paper>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                     <Typography variant="h4">{initialValues ? initialValues.name : ''}</Typography>
                     <Typography variant="body2" color="text.secondary">
                        가입일 {initialValues ? new Date(initialValues.createdAt).toLocaleDateString() : ''}
                     </Typography>
                  </Box>

                  <Box>
                     <Typography variant="body2" color="text.secondary">
                        후기 작성 3건 | 후원 횟수 22회 | 후원 순위 최고 기록 593위
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
                           <div>
                              <Grid container spacing={2}>
                                 {/* Row 1 */}
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="food" checked={selectedValues.food} onChange={handleChange} />} label="푸드" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="pets" checked={selectedValues.pets} onChange={handleChange} />} label="반려동물" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="art" checked={selectedValues.art} onChange={handleChange} />} label="그림" />
                                 </Grid>

                                 {/* Row 2 */}
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="books" checked={selectedValues.books} onChange={handleChange} />} label="도서" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="beauty" checked={selectedValues.beauty} onChange={handleChange} />} label="뷰티" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="clothing" checked={selectedValues.clothing} onChange={handleChange} />} label="의류" />
                                 </Grid>

                                 {/* Row 3 */}
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="living" checked={selectedValues.living} onChange={handleChange} />} label="리빙" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="photography" checked={selectedValues.photography} onChange={handleChange} />} label="사진" />
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox name="performance" checked={selectedValues.performance} onChange={handleChange} />} label="공연" />
                                 </Grid>
                              </Grid>
                           </div>
                           <Box sx={{ mt: 2 }}>
                              <Button variant="outlined" onClick={handleCategorySubmit}>
                                 등록
                              </Button>
                           </Box>
                        </ModifiedModalBox>
                     </Box>
                  </Box>
               </Box>
            </Box>
            {categoriesFromServer.length > 0 && (
               <StyledPaper>
                  <IconWrapper>
                     <CreateIcon style={{ color: '#4CAF50' }} />
                  </IconWrapper>
                  <Box flex={1}>
                     <Typography variant="h6" fontWeight="bold">
                        창작자 정보를 추가했어요!
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                        이제 스튜디오를 생성할 수 있어요. 나만의 스튜디오를 만들거나 팀원들과 함께 활동해보세요!
                     </Typography>
                  </Box>
                  <TextLink variant="body2" to="/studio">
                     <Button variant="contained" color="success">
                        나만의 스튜디오 만들기
                     </Button>
                  </TextLink>
               </StyledPaper>
            )}
            <Tabs tabItems={tabItems} />
         </Box>
      </Main>
   )
}

export default My
