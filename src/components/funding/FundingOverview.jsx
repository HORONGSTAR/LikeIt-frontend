import React from 'react'
import { Box, Typography, Avatar, Button, CardMedia, Stack } from '@mui/material'

const FundingOverview = ({ project }) => {
   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
         {/* 프로젝트 대표 이미지 */}
         <CardMedia component="img" image={project.image} alt={project.title} sx={{ borderRadius: 2, maxHeight: 400, objectFit: 'cover' }} />

         {/* 프로젝트 제목 */}
         <Typography variant="h4" fontWeight="bold">
            {project.title}
         </Typography>

         {/* 창작자 정보 */}
         <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={project.creator.profileImage} sx={{ width: 56, height: 56 }} />
            <Box>
               <Typography variant="subtitle1" fontWeight="bold">
                  {project.creator.name}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  구독자 수 {project.creator.subscribers}명
               </Typography>
            </Box>
         </Stack>

         {/* 모금 현황 */}
         <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold">
               {project.fundedAmount.toLocaleString()}원{' '}
               <Typography component="span" variant="body1" color="primary">
                  {Math.round((project.fundedAmount / project.targetAmount) * 100)}%
               </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
               목표 금액 {project.targetAmount.toLocaleString()}원
            </Typography>
            <Typography variant="body2" color="error">
               펀딩 기간: {project.startDate} ~ {project.endDate}
            </Typography>
         </Box>

         {/* 후원 버튼 */}
         <Button variant="contained" sx={{ backgroundColor: '#FFC107', color: '#000', fontSize: '1.1rem', fontWeight: 'bold', p: 1.5 }}>
            후원하기
         </Button>
      </Box>
   )
}

export default FundingOverview
