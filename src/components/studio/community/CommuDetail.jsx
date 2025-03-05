import { Box, Button, Card, CardContent, Typography, Avatar, Divider, Stack, TextField, IconButton, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingBox, ErrorBox } from '../../../styles/BaseStyles'
import { fetchCommunityByIdThunk, updateCommunityThunk, deleteCommunityThunk } from '../../../features/communitySlice'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import CommuComment from './CommuComment'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

const CommuDetail = ({ setOpen, id }) => {
   const { community, loading, error } = useSelector((state) => state.community)
   const { user } = useSelector((state) => state.auth)
   const { studio } = useSelector((state) => state.studio)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isCreator = studio?.StudioCreators?.some((creator) => creator.Creator?.User?.id === user?.id)
   const studioId = studio?.id

   const [isEditing, setIsEditing] = useState(false) // 수정 모드 상태
   const [editTitle, setEditTitle] = useState('')
   const [editContent, setEditContent] = useState('')
   const [editImage, setEditImage] = useState(null) // 미리보기 이미지
   const [imageFile, setImageFile] = useState(null) // 업로드할 파일

   useEffect(() => {
      dispatch(fetchCommunityByIdThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      if (community) {
         setEditTitle(community.title)
         setEditContent(community.contents)
         setEditImage(community.imgUrl ? process.env.REACT_APP_API_URL + community.imgUrl : null)
      }
   }, [community])

   if (!community || !community.User) return <LoadingBox />
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox />

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         setImageFile(file)
         setEditImage(URL.createObjectURL(file)) // 미리보기 설정
      }
   }

   const handleRemoveImage = () => {
      setEditImage(null)
      setImageFile(null)
   }

   const handleSave = async () => {
      if (!editTitle.trim() || !editContent.trim()) return // 빈 값 방지

      const formData = new FormData()
      formData.append('title', editTitle)
      formData.append('contents', editContent)

      if (imageFile) {
         formData.append('image', imageFile)
      } else if (!editImage) {
         formData.append('removeImage', 'true') // 문자열로 변환
      }

      try {
         await dispatch(updateCommunityThunk({ id: community.id, communityData: formData })).unwrap()
         setIsEditing(false) // 수정 모드 종료
         dispatch(fetchCommunityByIdThunk(id)) // 수정 후 최신 데이터 반영
      } catch (error) {
         console.error('게시글 수정 실패:', error)
      }
   }

   const handleDelete = async () => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
         try {
            await dispatch(deleteCommunityThunk(community.id)).unwrap()
            setOpen(null)
            navigate(`/studio/${studioId}`) // 삭제 후 스튜디오 페이지로 이동
         } catch (error) {
            console.error('게시글 삭제 실패:', error)
         }
      }
   }

   return (
      <>
         <Button onClick={() => setOpen(null)}>목록으로</Button>
         {community && (
            <Card sx={{ flexDirection: 'column', mb: 1 }} variant="outlined">
               <CardContent>
                  <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                     {isEditing ? <TextField fullWidth variant="outlined" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} autoFocus /> : <Typography variant="h4">{community.title}</Typography>}

                     {isCreator && (
                        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                           {isEditing ? null : (
                              <Box>
                                 <Button variant="outlined" onClick={() => setIsEditing(true)}>
                                    수정
                                 </Button>
                                 <Button variant="outlined" onClick={handleDelete}>
                                    삭제
                                 </Button>
                              </Box>
                           )}
                        </Stack>
                     )}
                  </Stack>

                  <Stack mt={1} direction="row" alignItems="center">
                     <Avatar src={process.env.REACT_APP_API_URL + '/userImg' + community.User.imgUrl || '/images/default-profile.jpg'} sx={{ width: 32, height: 32, mr: 1 }} />
                     <Stack spacing={-0.5}>
                        <Typography>{community.User.name || '닉네임 없음'}</Typography>
                        <Typography color="grey" variant="caption">
                           {dayjs(community.createdAt).format('YYYY.MM.DD HH:mm')}
                        </Typography>
                     </Stack>
                  </Stack>
               </CardContent>

               <Divider />

               <CardContent>
                  {isEditing ? (
                     <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        {editImage && (
                           <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
                              <CardMedia component="img" image={editImage} alt="첨부 이미지" sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'contain' }} />
                              <IconButton sx={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0, 0, 0, 0.5)', color: 'white' }} onClick={handleRemoveImage}>
                                 <CloseIcon />
                              </IconButton>
                           </Box>
                        )}
                     </Box>
                  ) : (
                     editImage && <CardMedia component="img" image={editImage} alt="게시글 이미지" sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'contain' }} />
                  )}

                  {isEditing ? <TextField fullWidth multiline variant="outlined" value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4} /> : <Typography>{community.contents}</Typography>}
               </CardContent>

               {isEditing && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                     <Button variant="contained" color="orenge" startIcon={<ImageIcon />} component="label">
                        이미지 첨부
                        <input type="file" hidden onChange={handleImageChange} />
                     </Button>
                     <Button variant="contained" color="orenge" onClick={handleSave}>
                        등록
                     </Button>
                     <Button variant="outlined" color="orenge" onClick={() => navigate(`/studio/${studioId}`)}>
                        취소
                     </Button>
                  </Box>
               )}

               {!isEditing && <CommuComment communityId={community.id} />}
            </Card>
         )}
      </>
   )
}

export default CommuDetail
