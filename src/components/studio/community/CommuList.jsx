import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommunitiesThunk } from '../../../features/communitySlice'
import { Typography, Card, CardContent, Avatar, Stack, Divider } from '@mui/material'
import { LoadingBox, ErrorBox, Stack2, ModalBox, Ellipsis } from '../../../styles/BaseStyles'

import dayjs from 'dayjs'
import CommuComment from '../community/CommuComment'

const CommuList = ({ setOpen }) => {
   const { communities, community, loading, error } = useSelector((state) => state.community)

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox />

   return (
      <>
         {communities.length > 0 ? (
            communities.map((community) => (
               <Card
                  key={'community' + community.id}
                  sx={{ flexDirection: 'column', mb: 1 }}
                  variant="outlined"
                  onClick={() => setOpen(community.id)}
               >
                  <Stack spacing={1} sx={{ px: { sm: 2, xs: 1 }, py: 1 }}>
                     <Stack2>
                        <Typography variant="h5">{community.title}</Typography>
                        <Typography color="grey" fontWeight={300} ml="auto">
                           {dayjs(community.createdAt).format('YYYY.MM.DD')}
                        </Typography>
                     </Stack2>
                     <Stack2>
                        <Avatar src={community.User.imgUrl || '/images/default-profile.jpg'} sx={{ width: 18, height: 18, mr: 0.4 }} />
                        <Typography>{community.User.name || '닉네임 없음'}</Typography>
                     </Stack2>
                  </Stack>
               </Card>
            ))
         ) : (
            <>등록된 글이 없습니다.</>
         )}
      </>
   )
}

export default CommuList
