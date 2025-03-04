import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'
import { LoadingBox } from '../../../styles/BaseStyles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectByIdThunk } from '../../../features/projectSlice'
import { useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOrdersThunk } from '../../../features/orderSlice'
import { fetchCreatorsThunk } from '../../../features/creatorSlice'
import { fetchStudioThunk } from '../../../features/studioSlice'

function FundHistory() {
   const dispatch = useDispatch()
   const selectedStudio = useRef(null)
   const { creators } = useSelector((state) => state.creator)
   const { project, loading } = useSelector((state) => state.project)
   const { orders } = useSelector((state) => state.order)
   const { id } = useParams()

   const totalFunds = useMemo(() => orders.reduce((sum, order) => sum + order.orderPrice, 0), [orders])
   const failedPayments = useMemo(() => orders.filter((order) => order.orderStatus === 'FUNDING_COMPLETE_NOT_PAID').reduce((sum, order) => sum + order.orderPrice, 0), [orders])
   const successfulPayments = totalFunds - failedPayments

   const totalPeople = orders.length
   const failedPeople = orders.filter((order) => order.orderStatus === 'FUNDING_COMPLETE_NOT_PAID').length
   const successfulPeople = totalPeople - failedPeople

   const platformFee = Math.floor(successfulPayments * 0.08)
   const vat = Math.floor(successfulPayments * 0.1)
   const totalSettlement = successfulPayments - (platformFee + vat)

   const formatWithComma = (value) => {
      if (value === null || value === undefined) return '0'
      if (typeof value === 'number') value = value.toString()
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   }

   useEffect(() => {
      dispatch(fetchStudioThunk())
         .unwrap()
         .then((result) => {
            selectedStudio.current = result.studio.id
            dispatch(fetchCreatorsThunk(selectedStudio.current))
         })
         .catch((error) => console.error('업데이트 실패:', error))
   }, [dispatch])

   const leader = creators.find((creator) => creator.role === 'LEADER')

   useEffect(() => {
      dispatch(fetchProjectByIdThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      dispatch(fetchOrdersThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      if (project?.Studio?.id) {
         dispatch(fetchCreatorsThunk(project.Studio.id))
      }
   }, [dispatch, project])

   if (loading) return <LoadingBox />
   if (!project) return <LoadingBox />

   return (
      <>
         <Typography variant="h5" my={2} ml={1}>
            프로젝트 정보
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  <TableRow>
                     <TableCell>프로젝트 제목</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>{project.title}</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>스튜디오 이름</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>{project.Studio?.name}</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>프로젝트 예산 정산 계정</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{leader?.Creator?.User?.email}</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         <Typography variant="h5" my={2} ml={1}>
            모금액
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  <TableRow>
                     <TableCell>총 모금액 ({formatWithComma(totalPeople)}명)</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>{formatWithComma(totalFunds)}원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>결제 실패 ({formatWithComma(failedPeople)}명)</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>{formatWithComma(failedPayments)} 원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>총 결제 금액 ({formatWithComma(successfulPeople)}명)</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{formatWithComma(successfulPayments)} 원</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         <Typography variant="h5" my={2} ml={1}>
            수수료
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  <TableRow>
                     <TableCell>플랫폼 수수료</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}> {formatWithComma(platformFee)}원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>부가가치세</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}> {formatWithComma(vat)}원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>전체 정산 금액</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>{formatWithComma(totalSettlement)}원</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         <Typography variant="h5" my={2} ml={1}>
            정산 세부 내역
         </Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #ccc' }}>
            <Table>
               <TableBody>
                  <TableRow>
                     <TableCell>프로젝트 예산</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>(프로젝트 예산의 %)</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>(프로젝트 예산의 %)</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>원</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>
      </>
   )
}

export default FundHistory
