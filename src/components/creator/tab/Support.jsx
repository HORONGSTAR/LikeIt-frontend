import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from '../../../features/orderSlice'
import { LoadingBox } from '../../../styles/BaseStyles'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function Support() {
   const dispatch = useDispatch()
   const { orders, giftStatistics, loading } = useSelector((state) => state.order)
   const [activeTab, setActiveTab] = useState('supporter')
   const { projectId } = useParams()
   const { totalSupporters } = useSelector((state) => state.order)

   // 프로젝트 ID가 없으면 3으로 설정(테스트용)
   const currentProjectId = projectId || 3

   const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

   useEffect(() => {
      dispatch(fetchOrdersThunk(currentProjectId))
   }, [dispatch, currentProjectId])

   const getStatusColor = (status) => {
      switch (status) {
         case 'FUNDING_COMPLETE_PAID':
            return '#80CD75'
         case 'FUNDING_COMPLETE_NOT_PAID':
            return '#C84137'
         case 'DELIVERY_WAITING':
            return '#ECBD00'
         default:
            return '#ECBD00'
      }
   }

   const getPaymentStatus = (status) => {
      switch (status) {
         case 'FUNDING_COMPLETE_PAID':
            return '결제 완료'
         case 'FUNDING_COMPLETE_NOT_PAID':
            return '결제 실패'
         case 'ON_FUNDING':
         default:
            return '결제 시도 중'
      }
   }

   const getDeliveryStatus = (order) => {
      if (order.orderStatus === 'FUNDING_COMPLETE_NOT_PAID') {
         return { label: '배송 보류', backgroundColor: '#EEE', color: '#666' }
      }
      if (!order.bill) {
         return { label: '배송 대기', backgroundColor: '#FFE29A', color: '#B25F00' }
      }
      return { label: '배송 완료', backgroundColor: '#DBE7D9', color: '#45843C' }
   }

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

   if (!orders || !giftStatistics) return <LoadingBox />
   if (loading) return <LoadingBox />

   const handleExportExcel = () => {
      const data = sortedOrders.map((order) => ({
         닉네임: order.User.name,
         선물: order.Reward.name,
         후원금액: order.orderPrice.toLocaleString(),
         후원일시:
            new Date(order.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '/').slice(0, -1) +
            ' ' +
            new Date(order.createdAt).toLocaleTimeString('ko-KR', {
               hour: '2-digit',
               minute: '2-digit',
               hour12: false,
            }),
         결제상태: getPaymentStatus(order.orderStatus),
         선물전달: getDeliveryStatus(order).label,
      }))

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, '후원자 관리')

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      saveAs(dataBlob, '후원자관리.xlsx')
   }

   const supporter = (
      <Stack spacing={1}>
         <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" p={1}>
               후원자 {totalSupporters}명
            </Typography>
            <Stack direction="row" spacing={1}>
               <Button variant="outlined">운송장 입력</Button>
               <Button variant="outlined" onClick={handleExportExcel}>
                  엑셀 파일 받기
               </Button>
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
                  {sortedOrders.map((order, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === orders.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>{order.User.name}</TableCell>
                        <TableCell
                           sx={{
                              borderBottom: 'none',
                              maxWidth: '150px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                           }}
                        >
                           {order.Reward.name}
                        </TableCell>

                        <TableCell sx={{ borderBottom: 'none' }}>{order.orderPrice.toLocaleString()}원</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                           {new Date(order.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '/').slice(0, -1)} {new Date(order.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Dot color={getStatusColor(order.orderStatus)} />
                              <Typography variant="body2">{getPaymentStatus(order.orderStatus)}</Typography>
                           </Box>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                           {(() => {
                              const { label, backgroundColor, color } = getDeliveryStatus(order)
                              return <Chip label={label} sx={{ backgroundColor: backgroundColor, color: color }} />
                           })()}
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
                        <TableCell sx={{ borderBottom: 'none' }}>{gift.Reward.name}</TableCell>
                        <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{gift.unique_supporters}명이 선택</TableCell>
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
                  {giftStatistics.map((gift, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === giftStatistics.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>에?</TableCell>
                        <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>몇개</TableCell>
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
