import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShowCommunitiesThunk } from '../../features/communitySlice'
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LoadingBox, ErrorBox } from '../../styles/BaseStyles'

const CommunityTab = () => {
   const dispatch = useDispatch()
   const { communities, loading, error } = useSelector((state) => state.community)

   useEffect(() => {
      dispatch(fetchShowCommunitiesThunk({ page: 1, limit: 10 }))
   }, [dispatch])

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox />

   return (
      <div>
         {communities.length > 0 ? (
            communities.map((community) => {
               const formattedDate = format(new Date(community.createdAt), 'yyyy년 M월 d일 HH시 mm분', { locale: ko })
               const profileImage = community.profile || '/images/default-profile.jpg' // 기본 프로필 이미지 설정

               return (
                  <Link to={`/studio/community/${community.id}`} key={community.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                     <Card
                        sx={{
                           mb: 2,
                           cursor: 'pointer',
                           '&:hover': { backgroundColor: '#f5f5f5' },
                           boxShadow: 'none',
                           border: '1px solid #ccc',
                        }}
                     >
                        <CardContent>
                           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Avatar src={profileImage} sx={{ width: 32, height: 32, mr: 1 }} />
                              <Typography variant="subtitle2" color="text.secondary">
                                 {community.userId}
                                 <br />
                                 {formattedDate}
                              </Typography>
                           </Box>
                           <Typography variant="h6" fontWeight="bold">
                              {community.title}
                           </Typography>
                        </CardContent>
                     </Card>
                  </Link>
               )
            })
         ) : (
            <div>등록된 글이 없습니다.</div>
         )}
      </div>
   )
}

export default CommunityTab
