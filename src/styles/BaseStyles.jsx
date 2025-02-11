import * as React from 'react'
import styled from 'styled-components'
import {
   Typography,
   Modal,
   Box,
   IconButton,
   Stack,
   CircularProgress,
   Dialog,
   DialogContent,
   DialogTitle,
   Container,
   Link as MuiLink,
} from '@mui/material'
import { Close, PlayArrowRounded } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Main = ({ children, spacing }) => {
   return (
      <Container maxWidth="md">
         <Stack spacing={spacing || 2}>{children}</Stack>
      </Container>
   )
}

export const SubTitle = ({ children, to }) => {
   return (
      <Stack2 pt={3}>
         <Typography variant="h4" component={Link} to={to}>
            {children}
         </Typography>
         <PlayArrowRounded />
      </Stack2>
   )
}

export const Dot = ({ children, both, float }) => {
   const dotSx = { display: 'block', width: 5, height: 5, background: '#222', borderRadius: '50%', m: 1, position: float && 'absolute', left: -20 }

   return (
      <Box display={'flex'}>
         <Stack2 sx={{ position: 'relative' }}>
            <Box sx={{ ...dotSx, left: -20 }} />
            {children}
            {both && <Box sx={{ ...dotSx, right: -20 }} />}
         </Stack2>
      </Box>
   )
}

export const TextLink = (props) => {
   return <MuiLink underline="hover" component={Link} fontWeight="bold" {...props} />
}

export const Stack2 = (props) => {
   return <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap' }} {...props} />
}

export const LoadingBox = ({ heightValue }) => {
   return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: heightValue || '120px' }}>
         <CircularProgress color="yellow" size={50} />
      </Stack>
   )
}

export const ModalBox = ({ children, openBtn, closeBtn }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         <Box onClick={() => setOpen(true)}>{openBtn}</Box>
         <Modal open={open} onClose={() => closeBtn || setOpen(false)}>
            <Box
               sx={{
                  position: 'absolute',
                  boxSizing: 'border-box',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 320,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 24,
                  px: 2,
                  py: 3,
                  maxHeight: 600,
                  overflowY: 'auto',
               }}
            >
               <IconButton
                  aria-label="close"
                  onClick={() => {
                     setOpen(false)
                  }}
                  sx={(theme) => ({
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: theme.palette.grey[500],
                  })}
               >
                  <Close />
               </IconButton>
               {children}
            </Box>
         </Modal>
      </>
   )
}

export const ErrorBox = ({ error, open, setOpen }) => {
   return (
      <>
         <Dialog
            onClose={() => {
               setOpen(false)
            }}
            aria-labelledby="에러 메세지"
            open={open}
         >
            <DialogTitle sx={{ m: 0, p: 2 }} id="에러 메세지">
               에러 메세지
            </DialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => {
                  setOpen(false)
               }}
               sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
               })}
            >
               <Close />
            </IconButton>
            <DialogContent dividers>
               <Typography gutterBottom color="error">
                  {error}
               </Typography>
               <Typography gutterBottom variant="body2">
                  문제가 계속 해결되지 않을 경우 관리자에게 문의 부탁드립니다.
               </Typography>
               <Typography gutterBottom variant="body2"></Typography>
            </DialogContent>
         </Dialog>
      </>
   )
}

export const Ellipsis = styled.div`
   width: 100%;
   text-overflow: ellipsis;
   overflow: hidden;
   word-break: break-word;
   display: -webkit-box;
   -webkit-line-clamp: ${(props) => props.$line || 1};
   -webkit-box-orient: vertical;
   @media (max-width: 600px) {
      -webkit-line-clamp: 1;
   }
`
