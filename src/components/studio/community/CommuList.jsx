import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Card, Avatar, Stack, Box, Button } from '@mui/material'
import { LoadingBox, ErrorBox, Stack2 } from '../../../styles/BaseStyles'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const CommuList = ({ setOpen }) => {
   const navigate = useNavigate()
   const { communities, loading, error } = useSelector((state) => state.community)
   const { studio } = useSelector((state) => state.studio)

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox />

   const filteredCommunities =
      studio?.id && communities
         ? communities.filter((community) => {
              return community.studioId === studio.id
           })
         : []

   return (
      <>
         {filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
               <Card key={'community' + community.id} sx={{ flexDirection: 'column', mb: 1 }} variant="outlined" onClick={() => setOpen(community.id)}>
                  <Stack spacing={1} sx={{ px: { sm: 2, xs: 1 }, py: 1 }}>
                     <Stack2>
                        <Typography variant="h5" sx={{ cursor: 'pointer' }}>
                           {community.title}
                        </Typography>
                        <Typography color="grey" fontWeight={300} ml="auto">
                           {dayjs(community.createdAt).format('YYYY.MM.DD HH:mm')}
                        </Typography>
                     </Stack2>
                     <Stack2>
                        <Avatar src={community.User?.imgUrl || '/images/default-profile.jpg'} sx={{ width: 18, height: 18, mr: 0.4 }} />
                        <Typography>{community.User?.name || '닉네임 없음'}</Typography>
                     </Stack2>
                  </Stack>
               </Card>
            ))
         ) : (
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 2,
                  alignItems: 'center',
                  justifyItems: 'center',
               }}
            >
               <Typography color="grey" variant="h4" mb={1}>
                  글이 없습니다. 글을 작성할까요?
               </Typography>
               <Button variant="yellow" sx={{ color: '#fff', fontSize: '20px', borderRadius: '5px', px: 4 }} onClick={() => navigate('/studio/community/write')}>
                  글쓰기
               </Button>
            </Box>
         )}
      </>
   )
}

export default CommuList
