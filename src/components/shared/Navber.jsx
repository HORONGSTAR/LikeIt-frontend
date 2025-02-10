import { NavLink, Link } from 'react-router-dom'
import { Menu as MenuClose, MenuOpen, Search as SearchIcon } from '@mui/icons-material'
import { TextField, AppBar, Container, IconButton, Button, Typography, Box, InputAdornment } from '@mui/material'
import { ModalBox, Stack2 } from '../../styles/BaseStyles'
import { useState } from 'react'
import AccountMenu from './AccountMenu'

function Navber({ isAuthenticated }) {
   const [open, setOpen] = useState(false)

   const navMeueItems = [
      { page: '인기', path: '/hot' },
      { page: '신규', path: '/new' },
      { page: '마감 임박', path: '/end' },
      { page: '공개 예정', path: '/comming' },
      { page: '구독', path: '/follow' },
   ]

   const accountMeunItems = [
      { page: '알림', path: '/hot', icon: 'bell' },
      { page: '스튜디오', path: '/studio', icon: 'edit' },
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

   const searchBox = (
      <TextField
         placeholder="프로젝트 검색"
         fullWidth
         variant="standard"
         aria-label="검색창"
         slotProps={{
            input: {
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon fontSize="small" />
                  </InputAdornment>
               ),
            },
         }}
      />
   )

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
                        <ModalBox openBtn={<SearchIcon />}>{searchBox}</ModalBox>
                     </IconButton>
                     {isAuthenticated ? <Button variant="contained">로그인</Button> : <AccountMenu items={accountMeunItems} />}
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
                     <Typography
                        key={item.page}
                        fontWeight="500"
                        component={NavLink}
                        to={item.path}
                        mr={breakpoint.margin}
                        onClick={() => setOpen(false)}
                     >
                        {item.page}
                     </Typography>
                  ))}
                  <Box sx={{ ml: 'auto', width: breakpoint.width, display: breakpoint.desktop }}>{searchBox}</Box>
               </Stack2>
               <Stack2 sx={{ flexWrap: 'wrap', my: 2, display: open ? 'flex' : 'none' }}>
                  {categoryItems.map((item) => (
                     <Stack2 key={item.id} mx={2} onClick={() => setOpen(!open)} component={Link} to={`/category/${item.id}`}>
                        <img src={`images/icon/${item.icon}.svg`} alt={item.name} width={12} />
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
