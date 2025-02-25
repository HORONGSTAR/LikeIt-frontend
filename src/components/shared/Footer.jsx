import { Box, Typography, Container, Button } from '@mui/material'
import { Stack } from '@mui/system'

function Footer() {
   return (
      <>
         <Box
            component="footer"
            sx={{
               py: 3,
               borderTop: '1px solid #ddd',
               height: 120,
            }}
         >
            <Container maxWidth="md">
               {/* 정보 & 고객센터 - 좌우 정렬 */}
               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  {/* 회사 정보 */}
                  <Stack>
                     <Stack direction="row" spacing={2} mb={1}>
                        {['공지사항', '서비스 소개', '제휴 · 협력', '수수료 안내', '개인정보처리방침', '이용약관'].map((text) => (
                           <Typography key={text} sx={{ fontWeight: 'bold', color: '#222', cursor: 'default' }}>
                              {text}
                           </Typography>
                        ))}
                     </Stack>
                     <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>회사명</Typography>
                        <Typography>(주)코딩병아리</Typography>
                        <Typography>|</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>주소</Typography>
                        <Typography>인천 남동구 인더코딩 63 인더빌딩 12층</Typography>
                        <Typography>|</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>대표</Typography>
                        <Typography>코딩닭</Typography>
                     </Stack>
                     <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>사업자등록번호</Typography>
                        <Typography>107-87-12345</Typography>
                        <Typography>|</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>대표번호</Typography>
                        <Typography>032-1233-4567</Typography>
                        <Typography>|</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>이메일</Typography>
                        <Typography>like-it@naver.com</Typography>
                     </Stack>
                  </Stack>

                  {/* 고객센터 */}
                  <Stack
                     sx={{
                        border: '1px solid #DDDDDD',
                        p: 2,
                        textAlign: 'left',
                        borderRadius: '8px',
                        minWidth: '180px',
                     }}
                  >
                     {/* 고객센터 타이틀 & 주말 및 공휴일 제외 (한 줄) */}
                     <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} ml={1}>
                        <Typography sx={{ fontWeight: 'bold', color: '#222' }}>고객센터</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#666' }}>주말 및 공휴일 제외</Typography>
                     </Stack>

                     {/* 운영 시간 */}
                     <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#222', ml: 1 }}>AM 10:30 - PM 06:30</Typography>

                     {/* 문의하기 버튼 */}
                     <Button variant="contained">문의하기</Button>
                  </Stack>
               </Stack>
            </Container>

            {/* 저작권 정보 */}
            <Stack
               sx={{
                  backgroundColor: '#EBEBEB',
                  color: '#666666',
                  py: 2,
                  textAlign: 'center',
               }}
            >
               <Typography variant="body2">Copyright 2025. Like It. All rights reserved.</Typography>
            </Stack>
         </Box>
      </>
   )
}

export default Footer
