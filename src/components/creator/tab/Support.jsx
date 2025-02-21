import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box } from '@mui/material'
import { TabLink } from '../../ui/Tabs'
import { useState } from 'react'

function Support() {
   const [activeTab, setActiveTab] = useState('supporter')

   // 샘플 후원자 데이터
   const supporterData = [
      { name: '박밸', gift: '발렌타인데이 초코볼 세트 배송', amount: '26,000원', date: '2021/11/14 23:57', status: '결제 완료', delivery: '배송 완료' },
      { name: '조나운', gift: '발렌타인데이 초코볼 세트 배송', amount: '26,000원', date: '2021/11/14 23:57', status: '결제 실패', delivery: '배송 보류' },
      { name: '강인우', gift: '발렌타인데이 초코볼 세트 배송', amount: '26,000원', date: '2021/11/14 23:57', status: '결제 시도 중', delivery: '배송 대기' },
      { name: '강인우', gift: '발렌타인데이 초코볼 세트 배송', amount: '26,000원', date: '2021/11/14 23:57', status: '결제 완료', delivery: '배송 완료' },
   ]

   // 샘플 선물 통계 데이터
   const giftStatistics = [
      { name: '발렌타인데이 초코볼 set', count: '30명이 선택' },
      { name: '발렌타인데이 초코볼 set (x 2)', count: '10명이 선택' },
   ]

   // 샘플 구성품 항목별 합계 데이터
   const itemStatistics = [
      { name: '다크 초코볼', count: '250개' },
      { name: '밀크 초코볼', count: '200개' },
      { name: '개별 포장 + 상자', count: '50개' },
   ]

   const Dot = ({ color }) => {
      return (
         <Box
            sx={{
               width: 8,
               height: 8,
               backgroundColor: color,
               borderRadius: '50%',
               display: 'inline-block',
               marginRight: '6px',
            }}
         />
      )
   }

   const getStatusColor = (status) => {
      switch (status) {
         case '결제 완료':
            return '#80CD75'
         case '결제 실패':
            return '#C84137'
         case '결제 시도 중':
            return '#ECBD00'
         default:
            return '#666'
      }
   }

   const getDeliveryVariant = (status) => {
      switch (status) {
         case '배송 완료':
            return 'green'
         case '배송 대기':
            return 'yellow'
         default:
            return 'grey'
      }
   }

   const supporter = (
      <Stack spacing={1}>
         <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" p={1}>
               후원자 {supporterData.length}명
            </Typography>
            <Stack direction="row" spacing={1}>
               <Button variant="outlined">운송장 입력</Button>
               <Button variant="outlined">엑셀 파일 받기</Button>
            </Stack>
         </Stack>

         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell sx={{ fontWeight: 'bold' }}>닉네임</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>선물</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>후원 금액</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>후원일시</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>결제 상태</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>선물 전달</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {supporterData.map((row, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === supporterData.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>{row.name}</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{row.gift}</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{row.amount}</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{row.date}</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Dot color={getStatusColor(row.status)} />
                              <Typography>{row.status}</Typography>
                           </Box>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                           <Chip variant={getDeliveryVariant(row.delivery)} label={row.delivery} />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Stack>
   )

   const gift = (
      <Stack spacing={2}>
         <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            • 선택된 선물 통계
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  {giftStatistics.map((gift, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === giftStatistics.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>{gift.name}</TableCell>
                        <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{gift.count}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            • 구성품 항목별 합계
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  {itemStatistics.map((item, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === itemStatistics.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>{item.name}</TableCell>
                        <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{item.count}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Stack>
   )

   return (
      <Stack spacing={2}>
         <Stack direction="row" spacing={1}>
            <Button variant={activeTab === 'supporter' ? 'contained' : 'outlined'} onClick={() => setActiveTab('supporter')}>
               후원자 관리
            </Button>
            <Button variant={activeTab === 'gift' ? 'contained' : 'outlined'} onClick={() => setActiveTab('gift')}>
               후원 선물 통계
            </Button>
         </Stack>

         {activeTab === 'supporter' ? supporter : gift}
      </Stack>
   )
}

export default Support
