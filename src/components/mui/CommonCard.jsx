import * as React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StatusChip from './StatusChip'

const CommonCard = ({ image, studio, title, description, chipLabel, chipColor, percentage, status }) => {
   // ✅ 펀딩 상태에 따른 스타일 지정
   const getCardStyle = () => {
      if (status === '실패') {
         return { filter: 'grayscale(100%)', opacity: 0.5 } // 펀딩 실패 → 회색
      }
      if (status === '완료') {
         return { opacity: 0.5 } // 펀딩 완료 → 반투명
      }
      return {} // 진행 중 → 기본 스타일
   }

   return (
      <Card sx={{ width: 280, borderRadius: 2, boxShadow: 2, position: 'relative', pb: 5, ...getCardStyle() }}>
         <CardActionArea>
            <CardMedia component="img" height="180" image={image} alt={title} />
            <CardContent sx={{ minHeight: '120px' }}>
               <Typography variant="body2" color="text.secondary">
                  {studio}
               </Typography>
               <Typography variant="h6" fontWeight="bold">
                  {title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {description}
               </Typography>
            </CardContent>
         </CardActionArea>

         <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
            <StatusChip label={chipLabel} bgColor={chipColor} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <FavoriteIcon sx={{ fontSize: 18, color: '#FFC107', mr: 0.5 }} />
               <Typography variant="h6" fontWeight="bold">
                  {percentage}%
               </Typography>
            </Box>
         </Box>
      </Card>
   )
}

export default CommonCard
