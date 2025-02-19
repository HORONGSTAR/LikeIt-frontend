import { useSelector, useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Divider, TextField, IconButton } from '@mui/material'
import StudioTab from './tab/StudioTab'
import { Stack2 } from '../../styles/BaseStyles'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { useNavigate } from 'react-router-dom'
import { updateStudioThunk, fetchStudioByIdThunk } from '../../features/studioSlice'

const StudioLayout = () => {
   const { studio } = useSelector((state) => state.studio)
   const { user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const Spen = (props) => <Typography component="span" color="green" {...props} />

   const isCreator = studio?.StudioCreators?.some((creator) => creator.Creator?.User?.id === user?.id)

   const [isEditing, setIsEditing] = useState(false)
   const [introText, setIntroText] = useState(studio?.intro || '')

   const handleEditClick = () => {
      setIsEditing(true)
   }

   const handleSave = useCallback(async () => {
      if (!studio?.id) {
         console.error('studio 데이터가 없습니다. 저장을 중단합니다.')
         return
      }

      try {
         await dispatch(
            updateStudioThunk({
               studioId: studio.id,
               studioData: { intro: introText },
            })
         ).unwrap()

         setIsEditing(false)
         dispatch(fetchStudioByIdThunk(studio.id))
      } catch (error) {
         console.error('소개글 업데이트 실패:', error)
      }
   }, [dispatch, studio?.id, introText])

   return (
      <>
         {studio && (
            <>
               <Card variant="none">
                  <CardMedia sx={{ minWidth: 180, height: 180, borderRadius: '10px' }} image={process.env.REACT_APP_API_URL + '/studioImg/' + studio.imgUrl} alt="스튜디오 프로필" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
                     <Stack2 mb={1} alignItems="center">
                        <Typography variant="h2" fontWeight="bold">
                           {studio.name}
                        </Typography>

                        {isCreator ? (
                           <Stack2>
                              <Button sx={{ background: 'linear-gradient(to right, #4ACBCF, #A57EFF)', color: '#fff', p: 1 }}>
                                 <MicIcon sx={{ fontSize: '20px' }} /> 스페이스
                              </Button>
                              <Button variant="yellow" sx={{ color: '#fff' }} onClick={() => navigate('/community/write')}>
                                 글쓰기
                              </Button>
                           </Stack2>
                        ) : (
                           <Button variant="contained">구독</Button>
                        )}
                     </Stack2>

                     <Stack2 sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        {isEditing ? (
                           <TextField
                              fullWidth
                              variant="standard"
                              value={introText}
                              onChange={(e) => setIntroText(e.target.value)}
                              onBlur={handleSave}
                              multiline
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    setIntroText((prev) => prev + '\n')
                                 }
                              }}
                              autoFocus
                           />
                        ) : (
                           <Typography color="grey" variant="body1" sx={{ whiteSpace: 'pre-line', flexGrow: 1 }}>
                              {introText}
                           </Typography>
                        )}

                        {isCreator && (
                           <IconButton size="small" onClick={isEditing ? handleSave : handleEditClick} sx={{ ml: 1 }}>
                              {isEditing ? <CheckIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                           </IconButton>
                        )}
                     </Stack2>

                     <Stack2 sx={{ gap: '0 10px' }}>
                        <Typography>
                           달성 프로젝트 <Spen>3건</Spen>
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>
                           구독자 수 <Spen>82명</Spen>
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>
                           최대 달성률 <Spen>1125%</Spen>
                        </Typography>
                     </Stack2>
                  </CardContent>
               </Card>
               <StudioTab />
            </>
         )}
      </>
   )
}

export default StudioLayout
