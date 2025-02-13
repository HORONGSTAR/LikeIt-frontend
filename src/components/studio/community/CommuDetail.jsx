import { Box, Button, Card, CardContent, Typography, Avatar, Divider, Stack, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingBox, ErrorBox, Stack2, ModalBox } from '../../../styles/BaseStyles'
import { fetchCommunityByIdThunk } from '../../../features/communitySlice'
import { Comment, CommentOutlined, FavoriteBorder, Favorite, Edit, Delete } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import CommuComment from './CommuComment'

const CommuDetail = ({ setOpen, id }) => {
   const { community, loading, error } = useSelector((state) => state.community)
   const [openComments, setOpenComments] = useState(false)

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCommunityByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox />

   return (
      <>
         <Button onClick={() => setOpen(null)}>목록으로</Button>
         {community && (
            <Card sx={{ flexDirection: 'column', mb: 1 }} variant="outlined">
               <CardContent>
                  <Typography variant="h4">{community.title}</Typography>
                  <Stack2 mt={1}>
                     <Avatar src={community.User.imgUrl || '/images/default-profile.jpg'} sx={{ width: 32, height: 32, mr: 1 }} />
                     <Stack spacing={-0.5}>
                        <Typography>{community.User.name || '닉네임 없음'}</Typography>
                        <Typography color="grey" variant="caption" ml="auto">
                           {dayjs(community.createdAt).format('YYYY.MM.DD')}
                        </Typography>
                     </Stack>
                  </Stack2>
               </CardContent>
               <Divider />
               <CardContent>
                  {community.imgUrl && (
                     <ModalBox
                        full
                        openBtn={
                           <Box
                              sx={{
                                 height: { sm: 300, xs: 200 },
                                 overflow: 'hidden',
                                 display: 'flex',
                                 alignItems: 'center',
                                 borderRadius: 1,
                                 cursor: 'pointer',
                                 my: 1,
                              }}
                           >
                              <Box component="img" src={process.env.REACT_APP_API_URL + '/studioImg/' + community.imgUrl} sx={{ width: '100%' }} />
                           </Box>
                        }
                     >
                        <Box
                           component="img"
                           src={process.env.REACT_APP_API_URL + '/studioImg/' + community.imgUrl}
                           sx={{ width: '100%', borderRadius: 1 }}
                        />
                     </ModalBox>
                  )}
                  <Typography>{community.contents}</Typography>
               </CardContent>
               <CommuComment communityId={community.id} />
            </Card>
         )}
      </>
   )
}

export default CommuDetail
