import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography, Paper, FormControl, Select, MenuItem, Grid, AppBar, Container } from '@mui/material'
import StudioNavber from '../components/shared/StudioNavber'
import LinkIcon from '@mui/icons-material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import ImageIcon from '@mui/icons-material/Image'
import { useNavigate, useParams } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import { fetchStudioByIdThunk, updateStudioThunk } from '../features/studioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingBox } from '../styles/BaseStyles'

function StudioEditPage() {
   const { id } = useParams() // URL에서 studioId 가져오기
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { studio, loading } = useSelector((state) => state.studio) // Redux 상태 가져오기

   // 기존 데이터 세팅을 위한 State
   const [studioName, setStudioName] = useState('')
   const [intro, setIntro] = useState('')
   const [file, setFile] = useState(null)
   const [image, setImage] = useState(null)
   const [imageUrl, setImageUrl] = useState('')
   const [snsLinks, setSnsLinks] = useState([
      { platform: 'instagram', link: '' },
      { platform: 'youtube', link: '' },
      { platform: 'twitter', link: '' },
   ])

   // 기존 스튜디오 데이터를 불러와서 입력 필드에 적용
   useEffect(() => {
      dispatch(fetchStudioByIdThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      if (studio) {
         setStudioName(studio.name || '')
         setIntro(studio.intro || '')
         setImageUrl(`${process.env.REACT_APP_API_URL}${studio.imgUrl}`)
         setSnsLinks(
            studio.snsLinks || [
               { platform: 'instagram', link: '' },
               { platform: 'youtube', link: '' },
               { platform: 'twitter', link: '' },
            ]
         )
      }
   }, [studio])

   // SNS 입력 필드 핸들링
   const handleSnsChange = (index, field, value) => {
      const newSnsLinks = [...snsLinks]
      newSnsLinks[index][field] = value
      setSnsLinks(newSnsLinks)
   }

   // 이미지 변경
   const handleImageChange = (event) => {
      const file = event.target.files[0]

      if (file) {
         // 파일 크기 제한 (10MB)
         if (file.size > 10 * 1024 * 1024) {
            alert('이미지 파일은 10MB 이하만 업로드 가능합니다.')
            return
         }

         // 파일 URL 생성 (미리보기)
         const imageUrl = URL.createObjectURL(file)
         setImage(file)
         setImageUrl(imageUrl)
      }
   }

   // 스튜디오 수정
   const handleUpdateStudio = async () => {
      if (!studioName.trim()) {
         alert('스튜디오 이름을 입력해주세요.')
         return
      }

      const formData = new FormData()
      formData.append('name', studioName)
      formData.append('intro', intro)
      formData.append('snsLinks', JSON.stringify(snsLinks))

      if (image) {
         formData.append('image', image) // 이미지 파일 추가
      }

      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}/studio/${id}`, {
            method: 'PUT',
            body: formData,
         })

         const data = await response.json()
         if (data.success) {
            alert('스튜디오 정보가 성공적으로 수정되었습니다!')
            dispatch(fetchStudioByIdThunk(id)) // Redux 상태 갱신 추가
            setTimeout(() => navigate('/studio'), 500) // 0.5초 후 이동 (안정성 확보)
         } else {
            throw new Error(data.message)
         }
      } catch (error) {
         console.error('스튜디오 수정 오류:', error)
         alert('스튜디오 수정 중 오류가 발생했습니다.')
      }
   }

   if (loading) return <LoadingBox />

   return (
      <>
         <StudioNavber />

         <AppBar position="static">
            <Container maxWidth="md">
               <Typography variant="h5" sx={{ p: 1 }}>
                  스튜디오 수정하기
               </Typography>
            </Container>
         </AppBar>

         <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               {/* 입력 폼 */}
               <Box sx={{ width: '100%', maxWidth: 500 }}>
                  <Typography variant="body1">스튜디오 프로필 이미지</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     {/* 프로필 이미지 미리보기 */}
                     <Paper
                        sx={{
                           width: 150,
                           height: 150,
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           justifyContent: 'center',
                           overflow: 'hidden',
                           boxShadow: 'none',
                           backgroundColor: '#EEE',
                           mr: 1,
                        }}
                     >
                        {imageUrl ? (
                           <img src={imageUrl} alt="프로필 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <ImageIcon sx={{ fontSize: 40, color: '#aaa' }} />
                              <Typography variant="body1" sx={{ color: '#999' }}>
                                 이미지 업로드
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#999' }}>
                                 최대 10MB
                              </Typography>
                           </Box>
                        )}
                     </Paper>

                     {/* 파일 선택 버튼 */}
                     <Button
                        component="label"
                        variant="contained"
                        sx={{
                           backgroundColor: '#D97400',
                           color: 'white',
                           '&:hover': { backgroundColor: '#D97400' },
                           textTransform: 'none',
                           width: '100px',
                           textAlign: 'center',
                        }}
                     >
                        파일 선택
                        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                     </Button>
                  </Box>

                  <Typography variant="body2" sx={{ display: 'block', mb: 2, color: '#666' }}>
                     최대 10MB의 이미지 파일을 업로드해주세요. 1:1 비율을 추천드립니다.
                  </Typography>

                  <Typography variant="body1">스튜디오 이름</Typography>
                  <input
                     type="text"
                     maxLength="30"
                     value={studioName}
                     onChange={(e) => setStudioName(e.target.value)}
                     style={{
                        width: '100%',
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                     }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                     <Typography variant="body2" sx={{ color: '#666' }}>
                        스튜디오의 이름을 지어주세요. (최대 30자)
                     </Typography>
                     <Typography variant="body2" sx={{ color: '#666' }}>
                        {studioName.length} / 30
                     </Typography>
                  </Box>

                  {/* 스튜디오 소개 */}
                  <Typography variant="body1">스튜디오 소개</Typography>
                  <textarea
                     maxLength="255"
                     value={intro}
                     onChange={(e) => setIntro(e.target.value)}
                     style={{
                        width: '100%',
                        padding: 10,
                        height: 80,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                     }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                     <Typography variant="body2" sx={{ color: '#666' }}>
                        스튜디오를 소개해주세요. (최대 255자)
                     </Typography>
                     <Typography variant="body2" sx={{ color: '#666' }}>
                        {intro.length} / 255
                     </Typography>
                  </Box>

                  <Typography variant="body1">활동 분야 · SNS 계정</Typography>
                  {snsLinks.map((sns, index) => (
                     <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }} key={index}>
                        <Grid item xs={4}>
                           <FormControl fullWidth>
                              <Select value={sns.platform} onChange={(e) => handleSnsChange(index, 'platform', e.target.value)} displayEmpty>
                                 <MenuItem value="instagram">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                       <InstagramIcon sx={{ color: '#D97400', mr: 1 }} />
                                       <Typography variant="body2">Instagram</Typography>
                                    </Box>
                                 </MenuItem>
                                 <MenuItem value="youtube">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                       <YouTubeIcon sx={{ color: 'red', mr: 1 }} />
                                       <Typography variant="body2">YouTube</Typography>
                                    </Box>
                                 </MenuItem>
                                 <MenuItem value="twitter">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                       <TwitterIcon sx={{ color: '#4DB5FF', mr: 1 }} />
                                       <Typography variant="body2">Twitter</Typography>
                                    </Box>
                                 </MenuItem>
                              </Select>
                           </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                           <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="SNS 링크 입력"
                              value={sns.link}
                              onChange={(e) => handleSnsChange(index, 'link', e.target.value)}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <LinkIcon color="action" />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </Grid>
                     </Grid>
                  ))}
                  <Typography variant="body2" sx={{ color: '#666' }}>
                     최대 3개까지 연결 가능합니다.
                  </Typography>

                  {/* 버튼 */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                     <Button
                        sx={{
                           backgroundColor: '#D97400',
                           color: 'white',
                           fontSize: '20px',
                           width: '200px',
                           height: '50px',
                           '&:hover': {
                              backgroundColor: '#D97400',
                              color: 'white',
                           },
                        }}
                        onClick={handleUpdateStudio}
                        disabled={!studioName.trim() || !intro.trim()}
                     >
                        수정
                     </Button>
                     <Button
                        sx={{
                           backgroundColor: 'white',
                           color: '#D97400',
                           border: '1px solid #D97400',
                           fontSize: '20px',
                           width: '200px',
                           height: '50px',
                           '&:hover': {
                              backgroundColor: 'white',
                              color: '#D97400',
                              border: '1px solid #D97400',
                           },
                        }}
                        onClick={() => navigate(-1)}
                     >
                        취소
                     </Button>
                  </Box>
               </Box>
            </Box>
         </Container>
      </>
   )
}

export default StudioEditPage
