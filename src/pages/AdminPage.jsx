import { AdminCard } from '../components/ui/Cards'
import { Grid2, TextField, Typography } from '@mui/material'
import { Box, Divider, Chip, FormControl, MenuItem, Select, IconButton } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bannerDelThunk, bannerRegThunk, fetchShowAdminProjectsThunk, proposalDenyThunk, proposalPassThunk } from '../features/adminSlice'
import { LoadingBox, Main } from '../styles/BaseStyles'

function AdminPage() {
   const dispatch = useDispatch()
   const { projects, count, loading, error } = useSelector((state) => state.admin)
   const [page, setPage] = useState(1)
   const [allCards, setAllCards] = useState([])
   const [loadingCount, setLoadingCount] = useState(8)
   const [scrollPosition, setScrollPosition] = useState(0)
   const [selectProposal, setSelcetProposal] = useState('')
   const [selectCategory, setSelcetCategory] = useState('')
   const [selectBanner, setSelcetBanner] = useState('')
   const [searchTerm, setSearchTerm] = useState('')
   const [searchSubmit, setSearchSubmit] = useState(false) // 버튼 클릭 트리거 상태

   // 검색어 변경 핸들러
   const handleSearchChange = useCallback((event) => {
      setSearchTerm(event.target.value)
   }, [])

   // 검색 버튼 클릭
   const handleSearchSubmit = useCallback((event) => {
      event.preventDefault()
      setSearchSubmit((prev) => !prev) // 상태를 토글하여 useEffect를 실행
      setPage(1) // 검색 시 페이지 초기화
   }, [])

   const handlekeyDown = (event) => {
      if (event.key === 'Enter') {
         handleSearchSubmit(event)
      }
   }

   const handleProposalChange = (event) => {
      setSelcetProposal(event.target.value)
   }

   const handleCategoryChange = (event) => {
      setSelcetCategory(event.target.value)
   }

   const handleBannerChange = (event) => {
      setSelcetBanner(event.target.value)
   }

   useEffect(() => {
      dispatch(fetchShowAdminProjectsThunk({ page, searchTerm, selectProposal, selectCategory, selectBanner }))
   }, [dispatch, page, searchSubmit])

   const bannerReg = useCallback(
      async (data) => {
         await dispatch(bannerRegThunk(data))
         dispatch(fetchShowAdminProjectsThunk({ page, searchTerm, selectProposal, selectCategory, selectBanner }))
      },
      [dispatch]
   )
   const bannerDel = useCallback(
      async (id) => {
         await dispatch(bannerDelThunk(id))
         dispatch(fetchShowAdminProjectsThunk({ page, searchTerm, selectProposal, selectCategory, selectBanner }))
      },
      [dispatch]
   )
   const proposalPass = useCallback(
      async (id) => {
         await dispatch(proposalPassThunk(id))
         dispatch(fetchShowAdminProjectsThunk({ page, searchTerm, selectProposal, selectCategory, selectBanner }))
      },
      [dispatch]
   )
   const proposalDeny = useCallback(
      async (id, denyMsg) => {
         await dispatch(proposalDenyThunk({ id, denyMsg }))
         dispatch(fetchShowAdminProjectsThunk({ page, searchTerm, selectProposal, selectCategory, selectBanner }))
      },
      [dispatch]
   )

   const adminFunc = {
      bannerReg,
      bannerDel,
      proposalPass,
      proposalDeny,
   }

   // 리스트 호출
   useEffect(() => {
      const newCards = []
      let cardCount = 0
      let row = []

      if (projects) {
         projects.forEach((project, index) => {
            let totalOrderPrice = 0
            if (project.totalOrderPrice) totalOrderPrice = project.totalOrderPrice
            let rate = Math.floor((totalOrderPrice / project.goal) * 100)
            let projectData = {
               id: project.id,
               studioName: project.Studio.name,
               title: project.title,
               intro: project.intro,
               state: project.projectStatus,
               imgUrl: process.env.REACT_APP_IMG_URL + '/projectImg' + project.imgUrl,
               startDate: project.startDate,
               endDate: project.endDate,
               userCount: project.userCount,
               rate,
               proposalStatus: project.proposalStatus,
            }
            if (project.BannerProject) projectData.bannerId = project.BannerProject.id
            cardCount++
            row.push(
               <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <AdminCard key={project.id} project={projectData} adminFunc={adminFunc} />
               </Grid2>
            )

            // 4개마다 새로운 row로 묶기
            if (cardCount % 4 === 0 || index === projects.length - 1) {
               newCards.push(
                  <Grid2 key={project.id} container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
                     {row}
                  </Grid2>
               )
               row = [] // 다음 배치를 위해 row 배열 초기화
            }
         })
         setAllCards((prevCards) => (page === 1 ? newCards : [...prevCards, ...newCards]))
         // 스크롤 위치 변경 setTimeout을 사용해 순서 보장
         setTimeout(() => {
            window.scrollTo(0, scrollPosition)
         }, 0)
      }
   }, [projects])

   const loadMoreProjects = () => {
      setScrollPosition(window.scrollY)
      setLoadingCount(loadingCount + 8)
      setPage(page + 1) // 페이지 번호 증가
   }
   if (loading)
      return (
         <Main>
            <LoadingBox />
         </Main>
      )
   if (error) return <Main>{error}</Main>

   return (
      <Main>
         <Grid2
            container
            m={1}
            p={1}
            sx={{
               border: '1px solid silver',
               borderRadius: '4px',
               display: 'flex',
               '& > .MuiGrid2-root': {
                  padding: '4px',
                  display: 'flex',
                  justifyContent: {
                     md: 'center',
                     sm: 'left',
                  },
               },
               '& > .MuiGrid2-root > .MuiTypography-root': {
                  lineHeight: '42px',
                  fontSize: '16px',
                  minWidth: '68px',
               },
            }}
         >
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
               <Typography>승인여부</Typography>
               <FormControl sx={{ minWidth: '100px' }}>
                  <Select value={selectProposal} onChange={handleProposalChange}>
                     <MenuItem value="">전체</MenuItem>
                     <MenuItem value="REVIEW_REQ">승인대기</MenuItem>
                     <MenuItem value="COMPLETE">승인허가</MenuItem>
                     <MenuItem value="DENIED">승인거부</MenuItem>
                  </Select>
               </FormControl>
            </Grid2>
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
               <Typography>카테고리</Typography>
               <FormControl sx={{ minWidth: '100px' }}>
                  <Select value={selectCategory} onChange={handleCategoryChange}>
                     <MenuItem value="">전체</MenuItem>
                     <MenuItem value="1">푸드</MenuItem>
                     <MenuItem value="2">반려동물</MenuItem>
                     <MenuItem value="3">그림</MenuItem>
                     <MenuItem value="4">도서</MenuItem>
                     <MenuItem value="5">뷰티</MenuItem>
                     <MenuItem value="6">의류</MenuItem>
                     <MenuItem value="7">리빙</MenuItem>
                     <MenuItem value="8">사진</MenuItem>
                     <MenuItem value="9">공연</MenuItem>
                  </Select>
               </FormControl>
            </Grid2>
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
               <Typography>배너등록</Typography>
               <FormControl sx={{ minWidth: '100px' }}>
                  <Select value={selectBanner} onChange={handleBannerChange}>
                     <MenuItem value="">전체</MenuItem>
                     <MenuItem value="BANNER">등록</MenuItem>
                     <MenuItem value="NO_BANNER">미등록</MenuItem>
                  </Select>
               </FormControl>
            </Grid2>
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
               <TextField variant="standard" onChange={handleSearchChange} onKeyDown={handlekeyDown} />
               <IconButton type="submit" onClick={handleSearchSubmit}>
                  <SearchIcon />
               </IconButton>
            </Grid2>
         </Grid2>
         {count ? (
            <>
               <p style={{ margin: '10px 0' }}>{count}개의 프로젝트가 있습니다.</p>
               {allCards}
               <Box py={4}>
                  <Divider>{loadingCount >= count ? <Typography color="grey">모든 프로젝트를 불러왔습니다</Typography> : <Chip onClick={loadMoreProjects} label="더보기" />}</Divider>
               </Box>
            </>
         ) : (
            <img src={process.env.REACT_APP_FRONT_URL + '/images/noProject.png'} width="640px" style={{ margin: '0 auto' }}></img>
         )}
      </Main>
   )
}

export default AdminPage
