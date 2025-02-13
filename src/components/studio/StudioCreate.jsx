import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'

const Container = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
})

function StudioCreate({}) {
   const navigate = useNavigate()

   return (
      <Container>
         {/* 제목 */}
         <Typography variant="h4" sx={{ color: '#666', mt: 6, fontSize: '24px' }}>
            스튜디오가 없습니다. 새로 만들까요?
         </Typography>

         {/* 버튼 */}
         <Button variant="yellow" sx={{ color: 'white', height: '50px', fontSize: '24px' }} onClick={() => navigate('/studio/create')}>
            스튜디오 만들기
         </Button>

         {/* 이미지 */}
         <Box>
            <img src="/images/142.png" alt="스튜디오 생성" style={{ width: '100%' }} />
         </Box>
      </Container>
   )
}

export default StudioCreate
