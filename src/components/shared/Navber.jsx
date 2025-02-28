import { NavLink, Link } from 'react-router-dom'
import { Menu as MenuClose, MenuOpen, Search as SearchIcon } from '@mui/icons-material'
import { AppBar, Container, IconButton, Button, Typography, Box } from '@mui/material'
import { ModalBox, Stack2 } from '../../styles/BaseStyles'
import { useState } from 'react'
import AccountMenu from './AccountMenu'
import SearchBar from './Searchbar'

function Navber({ isAuthenticated, user }) {
   const [open, setOpen] = useState(false)

   const navMeueItems = [
      { page: '인기', path: '/hot' },
      { page: '신규', path: '/new' },
      { page: '마감 임박', path: '/end' },
      { page: '공개 예정', path: '/comming' },
      { page: '구독', path: '/follow' },
   ]

   const accountMeunItems = [
      { page: '스튜디오', path: '/studio', icon: 'edit' },
      { page: '알림', path: `/notice`, icon: 'bell' },
      { page: '마이페이지', path: '/my', icon: 'user' },
   ]

   const categoryItems = [
      { id: 1, name: '푸드', icon: 'utensils' },
      { id: 2, name: '도서', icon: 'book' },
      { id: 3, name: '뷰티', icon: 'spray' },
      { id: 4, name: '리빙', icon: 'house' },
      { id: 5, name: '사진', icon: 'camera' },
      { id: 6, name: '그림', icon: 'palette' },
      { id: 7, name: '공연', icon: 'ticket' },
      { id: 8, name: '의류', icon: 'shirt' },
      { id: 9, name: '반려동물', icon: 'paw' },
   ]

   const breakpoint = {
      margin: { md: 6, sm: 3, xs: 1.4 },
      desktop: { sm: 'block', xs: 'none' },
      mobile: { sm: 'none', xs: 'block' },
      width: { md: 200, sm: 140 },
   }

   return (
      <>
         <AppBar position="static">
            <Container maxWidth="md" sx={{ background: '#fff' }}>
               <Stack2 my={2}>
                  <Link to="/">
                     <img src={process.env.REACT_APP_FRONT_URL + '/images/logo.svg'} alt="Like It!" />
                  </Link>
                  <Stack2 sx={{ ml: 'auto', alignItems: 'end' }}>
                     <IconButton sx={{ display: breakpoint.mobile }} size="small">
                        <ModalBox openBtn={<SearchIcon />}>
                           <SearchBar />
                        </ModalBox>
                     </IconButton>
                     {!isAuthenticated ? (
                        <Link to="/login">
                           <Button variant="contained">로그인</Button>
                        </Link>
                     ) : (
                        <AccountMenu items={user.creatorId ? accountMeunItems : accountMeunItems.splice(1, 2)} />
                     )}
                  </Stack2>
               </Stack2>
               <Stack2 my={2}>
                  <Stack2 onClick={() => setOpen(!open)} sx={{ mr: breakpoint.margin, cursor: 'pointer' }}>
                     {open ? <MenuOpen fontSize="small" /> : <MenuClose fontSize="small" />}
                     &nbsp;
                     <Typography fontWeight="500" display={breakpoint.desktop}>
                        카테고리
                     </Typography>
                  </Stack2>
                  {navMeueItems.map((item) => (
                     <Typography key={item.page} fontWeight="500" component={NavLink} to={item.path} mr={breakpoint.margin} onClick={() => setOpen(false)}>
                        {item.page}
                     </Typography>
                  ))}
                  <Box
                     sx={{
                        ml: 'auto',
                        width: breakpoint.width,
                        display: breakpoint.desktop,
                     }}
                  >
                     <SearchBar />
                  </Box>
               </Stack2>
               <Stack2 sx={{ flexWrap: 'wrap', my: 2, display: open ? 'flex' : 'none' }}>
                  {categoryItems.map((item) => (
                     <Stack2 key={item.id} mx={2} onClick={() => setOpen(!open)} component={Link} to={`/category/${item.id}`}>
                        <img src={process.env.REACT_APP_FRONT_URL + `/images/icon/${item.icon}.svg`} alt={item.name} width={12} />
                        &nbsp;
                        <Typography variant="body2">{item.name}</Typography>
                     </Stack2>
                  ))}
               </Stack2>
            </Container>
         </AppBar>
      </>
   )
}

export default Navber
