import React from 'react'
import { TimelineItem, TimelineSeparator, TimelineContent, TimelineDot } from '@mui/lab'
import { Typography, Grid, Box } from '@mui/material'

const TimelineEvent = ({ date, title, description, percentage, image, isLast }) => {
   return (
      <>
         <TimelineItem sx={{ minHeight: '150px', alignItems: 'center' }}>
            <Grid container alignItems="center">
               {/* 날짜 */}
               <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                     {date}
                  </Typography>
               </Grid>

               {/* 이미지 */}
               <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <TimelineSeparator>
                     <TimelineDot sx={{ width: 100, height: 100, backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <img src={image} alt={title} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                     </TimelineDot>
                  </TimelineSeparator>

                  {!isLast && (
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '95%', // 이미지 아래쪽으로 이동
                           left: '50%', // 이미지를 기준으로 가운데 정렬
                           transform: 'translateX(-50%)', // 정확한 중앙 정렬 보장
                           width: '2px',
                           height: '30px',
                           backgroundColor: '#ccc',
                        }}
                     />
                  )}
               </Grid>

               {/* 내용 */}
               <Grid item xs={9} sx={{ pl: 2 }}>
                  <TimelineContent>
                     <Typography variant="h6" fontWeight="bold">
                        {title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        {description}
                     </Typography>
                     <Typography variant="h6" color="#4caf50" fontWeight="bold" sx={{ mt: 1 }}>
                        {percentage} 달성
                     </Typography>
                  </TimelineContent>
               </Grid>
            </Grid>
         </TimelineItem>
      </>
   )
}

export default TimelineEvent
