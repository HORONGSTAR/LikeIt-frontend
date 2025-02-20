import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectByIdThunk } from '../../features/projectSlice'
import { useParams } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import { LoadingBox } from '../../styles/BaseStyles'
import CreatorTab from './tab/CreatorTab'

const CreatorLayout = () => {
   const dispatch = useDispatch()
   const { projectId } = useParams()
   const { project, loading, error } = useSelector((state) => state.project)

   useEffect(() => {
      const tempProjectId = projectId || 3
      dispatch(fetchProjectByIdThunk(tempProjectId))
   }, [dispatch, projectId])

   // 날짜 변환 함수 (YYYY. MM. DD 형식)
   const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '. ')
   }

   // 펀딩 종료까지 남은 일 수 계산
   const calculateDaysLeft = (endDate) => {
      if (!endDate) return ''
      const today = new Date()
      const end = new Date(endDate)
      const diffTime = end.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 남은 일 수 계산
      return diffDays > 0 ? `${diffDays}일 남음` : '펀딩 종료'
   }

   return (
      <>
         <Box>
            {loading ? (
               <LoadingBox />
            ) : error ? (
               <Typography color="error">에러 발생: {error}</Typography>
            ) : project ? (
               <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ flexShrink: 0 }}>
                     <img src={`${process.env.REACT_APP_API_URL}/projectImg/${project.imgUrl}`} alt={project.title} style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                     <Typography variant="h4" my={1}>
                        {project.title}
                     </Typography>

                     {/* 목표 금액 */}
                     <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>목표 금액</Typography>
                        <Typography>{project.goal.toLocaleString()}원</Typography>
                     </Box>

                     {/* 펀딩 기간 & 남은 기간 */}
                     <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mr: 1 }}>펀딩 기간</Typography>
                        <Typography sx={{ mr: 1 }}>
                           {formatDate(project.startDate)} ~ {formatDate(project.endDate)}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#B25F00', backgroundColor: '#ECBD00', padding: '2px 5px' }}>{calculateDaysLeft(project.endDate)}</Typography>
                     </Box>
                  </Box>
               </Box>
            ) : (
               <Typography>해당 프로젝트를 찾을 수 없습니다.</Typography>
            )}
         </Box>
         <CreatorTab />
      </>
   )
}

export default CreatorLayout
