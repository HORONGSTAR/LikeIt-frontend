import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatorsThunk, updateCreatorRoleThunk, addCreatorThunk, deleteCreatorThunk } from '../features/creatorSlice'
import { fetchStudioThunk } from '../features/studioSlice'
import { Card, Avatar, Typography, Checkbox, Button, Box, Modal, TextField } from '@mui/material'
import { LoadingBox, Main } from '../styles/BaseStyles'

function MemberPage() {
   const dispatch = useDispatch()
   const selectedStudio = useRef(null)
   const { creators, loading, error } = useSelector((state) => state.creator)
   const [open, setOpen] = useState(false)
   const [name, setName] = useState('')

   // 창작자 목록 불러오기
   useEffect(() => {
      dispatch(fetchStudioThunk())
         .unwrap()
         .then((result) => {
            selectedStudio.current = result.studio.id
            dispatch(fetchCreatorsThunk(selectedStudio.current))
         })
         .catch((error) => console.error('업데이트 실패:', error))
   }, [dispatch])

   // 모달 열고 닫기
   const handleOpen = () => setOpen(true)
   const handleClose = () => {
      setName('')
      setOpen(false)
   }

   // 닉네임 입력 핸들러
   const handleNicknameChange = (e) => {
      setName(e.target.value)
   }

   // 체크박스 변경 핸들러
   const handleCheckboxChange = (creator, field, currentValue) => {
      const newValue = currentValue === 'Y' ? 'N' : 'Y'
      const creatorId = creator.id

      if (!creatorId) {
         console.error('creatorId가 없습니다.')
         return
      }

      dispatch(updateCreatorRoleThunk({ id: creatorId, updatedData: { [field]: newValue } }))
         .unwrap()
         .then(() => {
            dispatch(fetchCreatorsThunk(selectedStudio.current))
         })
         .catch((error) => console.error('업데이트 실패:', error))
   }

   // 창작자 추가
   const handleAddCreator = async () => {
      if (!name.trim()) {
         console.error('이름을 입력해주세요.')
         return
      }

      if (!selectedStudio.current) {
         console.error('스튜디오 ID가 유효하지 않습니다.')
         return
      }

      try {
         const newCreator = {
            name,
            role: 'TEAMMATE',
            studioId: selectedStudio.current,
         }

         await dispatch(addCreatorThunk(newCreator)).unwrap()
      } catch (error) {
         console.error(error)
      } finally {
         dispatch(fetchCreatorsThunk(selectedStudio.current))
         handleClose()
      }
   }

   // 창작자 삭제
   const handleDeleteCreator = async (id) => {
      try {
         await dispatch(deleteCreatorThunk(id)).unwrap()
         dispatch(fetchCreatorsThunk(selectedStudio.current))
      } catch (error) {
         console.error('창작자 삭제 실패:', error)
      }
   }

   return (
      <>
         <Main>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <Typography variant="h5">창작자 관리</Typography>
               <Button variant="yellow" sx={{ ml: 1, color: '#fff', fontSize: '15px' }} onClick={handleOpen}>
                  추가
               </Button>
            </Box>

            {/* 데이터 로딩 중 */}
            {loading && <LoadingBox />}

            {/* 창작자 목록 표시 */}
            {!loading &&
               !error &&
               creators.map((creator, index) => (
                  <Card key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, padding: 2, boxShadow: 'none', border: '1px solid #AAA' }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 128, height: 128 }} src={creator?.Creator?.User?.imgUrl ? `${process.env.REACT_APP_API_URL}/userImg/${creator.Creator.User.imgUrl}` : `${process.env.REACT_APP_API_URL}/userImg/default_profile.png`} />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', mt: 1 }}>
                           <Typography variant="body2">{creator.role === 'LEADER' ? `대표 ${creator.Creator?.User?.name || '이름 없음'}` : creator.Creator?.User?.name || '이름 없음'}</Typography>
                           <Button
                              sx={{
                                 backgroundColor: 'red',
                                 color: '#fff',
                                 minWidth: '20px',
                                 maxHeight: '20px',
                                 fontSize: '12px',
                                 borderRadius: '4px',
                              }}
                              onClick={() => handleDeleteCreator(creator.id)}
                           >
                              탈퇴
                           </Button>
                        </Box>
                     </Box>

                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Checkbox checked={creator.communityAdmin === 'Y'} onChange={() => handleCheckboxChange(creator, 'communityAdmin', creator.communityAdmin)} color="yellow" />
                           <Typography variant="body2">글쓰기 권한</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Checkbox checked={creator.spaceAdmin === 'Y'} onChange={() => handleCheckboxChange(creator, 'spaceAdmin', creator.spaceAdmin)} color="yellow" />
                           <Typography variant="body2">스페이스 권한</Typography>
                        </Box>
                     </Box>
                  </Card>
               ))}

            {/* 창작자 추가 모달 */}
            <Modal open={open} onClose={handleClose} aria-labelledby="add-creator-modal">
               <Box
                  sx={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     width: 400,
                     bgcolor: 'background.paper',
                     boxShadow: 24,
                     p: 4,
                     borderRadius: 2,
                     textAlign: 'center',
                  }}
               >
                  <Typography variant="h6" id="add-creator-modal" gutterBottom>
                     스튜디오에 창작자를 추가하시겠어요?
                  </Typography>
                  <TextField fullWidth variant="outlined" placeholder="닉네임을 입력해주세요." value={name} onChange={handleNicknameChange} sx={{ my: 2 }} />
                  <Button variant="contained" color="warning" fullWidth onClick={handleAddCreator}>
                     추가
                  </Button>
               </Box>
            </Modal>
         </Main>
      </>
   )
}

export default MemberPage
