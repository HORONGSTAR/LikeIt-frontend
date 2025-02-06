import {
   AppBar,
   Stack,
   Container,
   Box,
   Typography,
   Button,
   TextField,
   InputAdornment,
   IconButton,
   Avatar,
   Tooltip,
   Menu,
   MenuItem,
   ListItemIcon,
   Divider,
} from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import { Menu as MenuClose, MenuOpen, Search as SearchIcon, Settings, Logout, Notifications, AutoAwesome } from '@mui/icons-material'
import { ModalBox } from '../../styles/StyledComponent'
import { useState } from 'react'

function Navber({ isAuthenticated, user }) {
   const [categoryOpen, setCategoryOpen] = useState(false)
   const [anchorEl, setAnchorEl] = useState(null)
   const userOpen = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const navMeue = [
      { page: '인기', path: '/hot' },
      { page: '신규', path: '/new' },
      { page: '마감 임박', path: '/end' },
      { page: '공개 예정', path: '/comming' },
      { page: '구독', path: '/follow' },
   ]

   const categoryMenu = [
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
               <Stack my={2}>
                  <Link>
                     <img src="images/logo.svg" alt="Like It!" />
                  </Link>
                  <Stack sx={{ ml: 'auto', alignItems: 'end' }}>
                     <IconButton sx={{ display: breakpoint.mobile }} size="small">
                        <ModalBox openBtn={<SearchIcon fontSize="small" />}>{searchBox}</ModalBox>
                     </IconButton>
                     {isAuthenticated ? (
                        <Button variant="contained">로그인</Button>
                     ) : (
                        <Tooltip title="내 계정">
                           <IconButton
                              onClick={handleClick}
                              size="small"
                              aria-controls={userOpen ? 'account-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={userOpen ? 'true' : undefined}
                           >
                              <Avatar sx={{ width: 32, height: 32 }} />
                           </IconButton>
                        </Tooltip>
                     )}
                  </Stack>
               </Stack>
               <Stack my={2}>
                  <Stack onClick={() => setCategoryOpen(!categoryOpen)} sx={{ mr: breakpoint.margin, cursor: 'pointer' }}>
                     {categoryOpen ? <MenuOpen fontSize="small" /> : <MenuClose fontSize="small" />}
                     &nbsp;
                     <Typography display={breakpoint.desktop}>카테고리</Typography>
                  </Stack>
                  {navMeue.map((item) => (
                     <Typography key={item.page} component={NavLink} to={item.path} mr={breakpoint.margin} onClick={() => setCategoryOpen(false)}>
                        {item.page}
                     </Typography>
                  ))}
                  <Box sx={{ ml: 'auto', width: breakpoint.width, display: breakpoint.desktop }}>{searchBox}</Box>
               </Stack>
               <Stack sx={{ flexWrap: 'wrap', my: 2, display: categoryOpen ? 'flex' : 'none' }}>
                  {categoryMenu.map((item) => (
                     <Stack key={item.id} mx={2} onClick={() => setCategoryOpen(!categoryOpen)} component={Link} to={`/category/${item.id}`}>
                        <img src={`images/icon/${item.icon}.svg`} width={12} />
                        &nbsp;
                        <Typography variant="body2">{item.name}</Typography>
                     </Stack>
                  ))}
               </Stack>
            </Container>
         </AppBar>

         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={userOpen}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
               paper: {
                  elevation: 0,
                  sx: {
                     overflow: 'visible',
                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                     mt: 1.5,
                     '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                     },
                     '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                     },
                  },
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Notifications fontSize="small" />
               </ListItemIcon>
               알림
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <AutoAwesome fontSize="small" />
               </ListItemIcon>
               스튜디오
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Settings fontSize="small" />
               </ListItemIcon>
               마이페이지
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Logout fontSize="small" />
               </ListItemIcon>
               로그아웃
            </MenuItem>
         </Menu>
      </>
   )
}

export default Navber
