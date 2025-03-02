import { AppBar, Container, Typography, Button, IconButton } from '@mui/material'
import { Menu as MenuClose, MenuOpen } from '@mui/icons-material'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import AccountMenu from './AccountMenu'
import { Stack2 } from '../../styles/BaseStyles'

function StudioNavber({ isAuthenticated, user }) {
   const [open, setOpen] = useState(false)

   const studioMenu = [
      { page: '새 프로젝트', path: '/studio/project/create' },
      { page: '모든 프로젝트', path: '/studio/project/all' },
      { page: '창작자 관리', path: '/studio/member' },
   ]

   const accountMeunItems = [
      { page: '메인으로', path: '/', icon: 'house' },
      { page: '알림', path: '/hot', icon: 'bell' },
      { page: '마이페이지', path: '/my', icon: 'user' },
   ]

   const breakpoint = {
      margin: { md: 4, sm: 2, xs: 1 },
      desktop: { sm: 'flex', xs: 'none' },
      mobile: { sm: 'none', xs: 'flex' },
      width: { md: 200, sm: 140 },
   }

   return (
      <>
         <AppBar position="static">
            <Container maxWidth="md">
               <Stack2 my={2}>
                  {user?.studioId ? (
                     <>
                        <Link to="/studio">
                           <img src={process.env.REACT_APP_FRONT_URL + '/images/logoStudio.svg'} alt="Studio" />
                        </Link>

                        <Stack2 sx={{ display: breakpoint.desktop, ml: breakpoint.margin, alignItems: 'end', height: 32 }}>
                           {studioMenu.map((item) => (
                              <Typography key={item.page} fontWeight="500" component={NavLink} to={item.path} mr={breakpoint.margin} onClick={() => setOpen(false)}>
                                 {item.page}
                              </Typography>
                           ))}
                        </Stack2>
                     </>
                  ) : (
                     <Link to="/">
                        <img src={process.env.REACT_APP_FRONT_URL + '/images/logo.svg'} alt="Like It!" />
                     </Link>
                  )}

                  <Stack2 ml="auto">
                     <IconButton sx={{ display: breakpoint.mobile }} onClick={() => setOpen(!open)}>
                        {open ? <MenuOpen /> : <MenuClose />}
                     </IconButton>
                     {!isAuthenticated ? (
                        <Link to="/login">
                           <Button variant="contained">로그인</Button>
                        </Link>
                     ) : (
                        <AccountMenu items={user?.studioId ? accountMeunItems : accountMeunItems.splice(1, 2)} />
                     )}
                  </Stack2>
               </Stack2>
            </Container>
         </AppBar>
      </>
   )
}

export default StudioNavber
