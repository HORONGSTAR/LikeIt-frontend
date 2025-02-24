import { Box, Tooltip, Menu, MenuItem, IconButton, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { logoutUserThunk } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

function AccountMenu({ items }) {
   const [anchorEl, setAnchorEl] = useState(null)
   const userOpen = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate])

   return (
      <>
         <Tooltip title="내 계정">
            <IconButton
               onClick={handleClick}
               size="small"
               aria-controls={userOpen ? 'account-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={userOpen ? 'true' : undefined}
            >
               <Avatar sx={{ width: 32, height: 32 }} src={process.env.REACT_APP_API_URL + ''} />
            </IconButton>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            id="userMenu"
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
            {items.map((item) => (
               <MenuItem key={item.page} component={Link} to={item.path} onClick={handleClose}>
                  <Box component="img" src={process.env.REACT_APP_FRONT_URL + `/images/icon/${item.icon}.svg`} sx={{ width: 12, mr: 1 }} />

                  {item.page}
               </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
               <Box component="img" src={process.env.REACT_APP_FRONT_URL + '/images/icon/logout.svg'} sx={{ width: 12, mr: 1 }} />
               로그아웃
            </MenuItem>
         </Menu>
      </>
   )
}

export default AccountMenu
