import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, TextField, InputAdornment, Card, CardMedia, CardContent, CardActions, Button, Pagination, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Main, LoadingBox, TextLink } from '../styles/BaseStyles'
import { fetchProjectsByStudioThunk } from '../features/projectSlice'
import { fetchStudioThunk } from '../features/studioSlice'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'

// 날짜 포맷 함수
function formatDate(dateString) {
   if (!dateString) return ''
   const date = new Date(dateString)
   const year = date.getFullYear()
   const month = (date.getMonth() + 1).toString().padStart(2, '0')
   const day = date.getDate().toString().padStart(2, '0')
   return `${year}/${month}/${day}`
}

function getStatusData(project) {
   if (project.proposalStatus === 'DENIED') {
      return {
         label: '승인 거부',
         style: { backgroundColor: '#CCCCCC', color: '#666', notLink: true },
      }
   }
   if (project.proposalStatus === 'REVIEW_REQ') {
      return {
         label: '검토 중',
         style: { backgroundColor: '#DBE7D9', color: '#45843C', notLink: true },
      }
   }
   if (project.proposalStatus === 'WRITING') {
      return {
         label: '작성 중',
         style: { backgroundColor: '#CCCCCC', color: '#666', notLink: true },
      }
   }
   switch (project.projectStatus) {
      case 'ON_FUNDING':
         return {
            label: '펀딩 진행 중',
            style: { backgroundColor: '#DBE7D9', color: '#45843C' },
         }
      case 'WAITING_FUNDING':
         return {
            label: '대기 중',
            style: { backgroundColor: '#DBE7D9', color: '#45843C' },
         }
      case 'FUNDING_COMPLETE':
         return {
            label: '펀딩 성공',
            style: { backgroundColor: '#FFE29A', color: '#D97400' },
         }
      case 'FUNDING_FAILED':
         return {
            label: '펀딩 실패',
            style: { backgroundColor: '#CCCCCC', color: '#666' },
         }
      default:
         return {
            label: '알 수 없는 상태',
            style: { backgroundColor: '#CCCCCC', color: '#666' },
         }
   }
}

function ProjectAllPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const selectedStudio = useRef(null)

   const { projects, loading, error } = useSelector((state) => state.project)

   const [page, setPage] = useState(1)
   const itemsPerPage = 5

   const [searchQuery, setSearchQuery] = useState('')

   useEffect(() => {
      dispatch(fetchStudioThunk())
         .unwrap()
         .then((result) => {
            selectedStudio.current = result.studio.id
            dispatch(fetchProjectsByStudioThunk({ studioId: selectedStudio.current, page: 1, limit: 9999 }))
         })
         .catch((err) => console.error('업데이트 실패:', err))
   }, [dispatch])

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleSearchChange = (e) => {
      setSearchQuery(e.target.value)
      setPage(1)
   }

   const filteredProjects = projects?.filter((project) => {
      return project.title.toLowerCase().includes(searchQuery.toLowerCase())
   })

   const startIndex = (page - 1) * itemsPerPage
   const currentProjects = filteredProjects?.slice(startIndex, startIndex + itemsPerPage)

   return (
      <Main>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">모든 프로젝트</Typography>
            <TextField
               variant="standard"
               size="small"
               value={searchQuery}
               onChange={handleSearchChange}
               placeholder="프로젝트 검색"
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon />
                     </InputAdornment>
                  ),
               }}
            />
         </Box>

         {loading && <LoadingBox />}
         {error && <Typography color="error">{error}</Typography>}

         {!loading &&
            !error &&
            currentProjects?.map((project, index) => {
               const { label, style } = getStatusData(project)
               return (
                  <Box key={index} sx={{ mb: 2 }}>
                     <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                           {formatDate(project.startDate)} ~ {formatDate(project.endDate)}
                        </Typography>
                        {(project.projectStatus === 'FUNDING_FAILED' || project.proposalStatus === 'DENIED' || project.proposalStatus === 'WRITING') && (
                           <TextLink sx={{ color: '#666', fontSize: '13px', display: 'flex', alignItems: 'center' }} to={`/studio/project/edit/${project.id}`}>
                              <EditIcon sx={{ fontSize: '15px' }} /> 프로젝트 수정하기
                           </TextLink>
                        )}
                     </Stack>

                     <Card
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           boxShadow: 'none',
                           border: '1px solid #AAA',
                           borderRadius: 2,
                           maxHeight: 100,
                           cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/funding/${project.id}`)}
                     >
                        <CardMedia
                           component="img"
                           image={project.imgUrl ? `${process.env.REACT_APP_IMG_URL}/projectImg/${project.imgUrl}` : '/placeholder.png'}
                           alt={project.title}
                           sx={{
                              width: 200,
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 0,
                           }}
                        />

                        <CardContent sx={{ flex: 1, minWidth: 0, p: 1, ml: 1 }}>
                           <Typography variant="h6" noWrap>
                              {project.title}
                           </Typography>
                           <Typography
                              variant="body2"
                              sx={{
                                 maxWidth: '500px',
                                 whiteSpace: 'nowrap',
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                              }}
                           >
                              {project.contents}
                           </Typography>
                           <Typography variant="h6" sx={{ mt: 1, color: '#45843C' }}>
                              목표금액 {Number(project.goal).toLocaleString()}원
                           </Typography>
                        </CardContent>

                        <CardActions sx={{ mr: 2 }}>
                           <Button sx={{ ...style, width: '120px', height: '40px', fontSize: '14px' }}>{label}</Button>
                        </CardActions>
                     </Card>
                  </Box>
               )
            })}

         {/* 페이지네이션 */}
         {!loading && !error && filteredProjects && filteredProjects.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
               <Pagination
                  count={Math.ceil(filteredProjects.length / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  showFirstButton
                  showLastButton
                  sx={{
                     '& .MuiPaginationItem-root': {
                        borderRadius: '0',
                        '&.Mui-selected': {
                           backgroundColor: 'transparent',
                           textDecoration: 'underline',
                           color: '#222',
                           fontWeight: 'bold',
                        },
                     },
                  }}
               />
            </Box>
         )}
      </Main>
   )
}

export default ProjectAllPage
