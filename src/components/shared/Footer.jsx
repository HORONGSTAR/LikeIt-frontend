import { Box, Typography, Container, Button, Divider, Grid2, Card } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'

function Footer() {
   const Spen = (props) => <Typography variant="body2" component="span" ml={0.6} {...props} />
   const links = ['공지사항', '서비스 소개', '제휴 · 협력', '수수료 안내', '개인정보처리방침', '이용약관']
   const contents = [
      { label: '회사명', value: '(주)코딩병아리' },
      { label: '주소', value: '인천 남동구 인더코딩 63 인더빌딩 12층' },
      { label: '대표', value: '코딩닭' },
      { label: '사업자등록번호', value: '107-87-12345' },
      { label: '대표번호', value: '032-1233-4567' },
      { label: '이메일', value: 'like-it@naver.com' },
   ]

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
            <Container maxWidth="md" sx={{ mb: 3 }}>
               <Grid2 container alignItems="center" rowSpacing={1}>
                  <Grid2 size={{ md: 9, sm: 12, xs: 12 }}>
                     <Stack2>
                        {links.map((link) => (
                           <Typography key={link} sx={{ fontWeight: 500, cursor: 'default', mr: 2, mb: 0.5 }}>
                              {link}
                           </Typography>
                        ))}
                     </Stack2>
                     <Stack2>
                        {contents.map((content, index) => (
                           <Stack2 key={content.label}>
                              <Typography variant="body2" sx={{ color: '#333', fontWeight: 600, lineHeight: 2 }}>
                                 {content.label}
                                 <Spen>{content.value}</Spen>
                              </Typography>
                              <Divider sx={{ mx: 1, display: index === 5 && 'none' }} orientation="vertical" flexItem variant="middle" />
                           </Stack2>
                        ))}
                     </Stack2>
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12, xs: 12 }}>
                     <Card variant="outlined">
                        <Box sx={{ p: 2, width: '100%' }}>
                           <Typography sx={{ fontWeight: 'bold', color: '#222' }}>
                              고객센터 <Spen>주말 및 공휴일 제외</Spen>
                           </Typography>
                           <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#222' }}>
                              AM 10:30 - PM 06:30
                           </Typography>
                           <Button fullWidth sx={{ mx: 0 }} variant="contained">
                              문의하기
                           </Button>
                        </Box>
                     </Card>
                  </Grid2>
               </Grid2>
            </Container>
            <Box
               sx={{
                  backgroundColor: '#EBEBEB',
                  color: '#666666',
                  py: 2,
                  textAlign: 'center',
               }}
            >
               <Typography variant="body2">Copyright 2025. Like It. All rights reserved.</Typography>
            </Box>
         </Box>
      </>
   )
}

export default Footer
