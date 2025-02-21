import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'
import { LoadingBox } from '../../../styles/BaseStyles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectByIdThunk } from '../../../features/projectSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function FundHistory() {
   const { project, loading } = useSelector((state) => state.project)
   const dispatch = useDispatch()
   const { projectId } = useParams()

   const currentProjectId = projectId || 3

   useEffect(() => {
      dispatch(fetchProjectByIdThunk(currentProjectId))
   }, [dispatch, currentProjectId])

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
                     <TableCell sx={{ textAlign: 'right' }}>이름</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>프로젝트 예산 정산 계정</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>계정</TableCell>
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
                     <TableCell>총 모금액 (명)</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>결제 실패 (명)</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>총 결제 금액 (명)</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>원</TableCell>
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
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>부가가치세</TableCell>
                     <TableCell sx={{ textAlign: 'right' }}>원</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell sx={{ borderBottom: 'none' }}>전체 정산 금액</TableCell>
                     <TableCell sx={{ textAlign: 'right', borderBottom: 'none' }}>원</TableCell>
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
