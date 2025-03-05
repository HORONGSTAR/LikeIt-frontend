import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, Input, Grid2 } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from '../../../features/orderSlice'
import { LoadingBox } from '../../../styles/BaseStyles'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { uploadTrackingNumbersThunk } from '../../../features/orderSlice'
import { fetchRewardThunk } from '../../../features/rewardSlice'

function Support() {
   const dispatch = useDispatch()
   const { orders, giftStatistics, loading } = useSelector((state) => state.order)
   const [activeTab, setActiveTab] = useState('supporter')
   const { id } = useParams()
   const { totalSupporters } = useSelector((state) => state.order)
   const [file, setFile] = useState(null)
   const [uploadStatus, setUploadStatus] = useState('')
   const [rewardProducts, setRewardProducts] = useState([])

   const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

   useEffect(() => {
      dispatch(fetchOrdersThunk(id))
      dispatch(fetchRewardThunk(id))
         .unwrap()
         .then((result) => {
            const reward = result.reward.Rewards

            const rewardProductsArray = reward.flatMap((item) => {
               // 1. Orders의 orderCount 총합 계산
               const totalOrderCount = item.Orders.reduce((sum, order) => sum + order.orderCount, 0)

               // 2. RewardProducts 배열을 변환하면서 totalCount 추가
               return item.RewardProducts.map((product) => ({
                  ...product,
                  totalCount: product.RewardProductRelation.stock * totalOrderCount,
               }))
            })

            setRewardProducts(rewardProductsArray)
         })
         .catch((error) => {
            console.error('리워드 데이터 변경 중 오류 발생:', error)
         })
   }, [dispatch, id])

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

   // 엑셀 파일 선택 핸들러
   const handleFileChange = (e) => {
      setFile(e.target.files[0])
   }

   // 엑셀 파일 업로드 핸들러
   const handleUpload = async () => {
      if (!file) {
         alert('엑셀 파일을 선택해주세요.')
         console.log('파일이 선택되지 않음')
         return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
         dispatch(uploadTrackingNumbersThunk(formData))
         dispatch(fetchOrdersThunk(id))
      } catch (error) {
         console.error('운송장 등록 오류:', error)
         setUploadStatus('업로드 실패! 다시 시도해주세요.')
      }
   }

   const handleDownloadTemplate = () => {
      const fileUrl = `${process.env.REACT_APP_API_URL}/uploads/운송장 입력.xlsx`
      const link = document.createElement('a')
      link.href = fileUrl
      link.setAttribute('download', '운송장 입력.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
         운송장번호: order.orderTrackingNumber || '미등록',
         택배사: order.shippingCompany || '미등록',
         선물전달: getDeliveryStatus(order).label,
      }))

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, '후원자 관리')

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      saveAs(dataBlob, '후원자관리.xlsx')
   }

   const totalProductCount = rewardProducts.reduce((acc, product) => {
      return acc + product.orderCount * (product.stock || 0) // stock 값이 null일 경우 0 처리
   }, 0)

   const supporter = (
      <Stack spacing={1}>
         <Grid2 container sx={{}}>
            <Grid2 size={{ sm: 3, xs: 12 }}>
               <Typography variant="h5" p={1}>
                  후원자 {totalSupporters}명
               </Typography>
            </Grid2>
            <Grid2
               size={{ sm: 9, xs: 12 }}
               direction="row"
               spacing={1}
               sx={{
                  textAlign: {
                     sm: 'right',
                     xs: 'left',
                  },
               }}
            >
               <Button variant="outlined" onClick={handleDownloadTemplate}>
                  운송장 서식 다운로드
               </Button>
               <Input type="file" onChange={handleFileChange} accept=".xlsx, .xls" id="upload-button" sx={{ display: 'none' }} />
               <Button variant="outlined" component="label" htmlFor="upload-button">
                  운송장 입력
               </Button>
               <Button variant="outlined" onClick={handleUpload}>
                  업로드
               </Button>
               <Button variant="outlined" onClick={handleExportExcel}>
                  엑셀 파일 받기
               </Button>
            </Grid2>
         </Grid2>

         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell sx={{ fontWeight: 'bold' }}>닉네임</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>선물</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>후원 금액</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>후원일시</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>결제 상태</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>운송장 번호</TableCell>
                     <TableCell sx={{ fontWeight: 'bold' }}>택배사</TableCell>
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
                        <TableCell sx={{ borderBottom: 'none' }}>{order.orderTrackingNumber || '미등록'}</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>{order.shippingCompany || '미등록'}</TableCell>
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
                  {rewardProducts.map((product, index) => (
                     <TableRow key={index} sx={{ borderBottom: index === rewardProducts.length - 1 ? 'none' : '1px solid #ddd' }}>
                        <TableCell sx={{ borderBottom: 'none' }}>{product.title}</TableCell>
                        <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{product.totalCount}개</TableCell>
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
