import * as React from 'react'
import { Typography, Modal, Box, IconButton, Stack, CircularProgress, Dialog, DialogContent, DialogTitle, Chip } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useState } from 'react'

export const LoadingBox = () => {
   return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
         <CircularProgress color="secondary" size={50} />
      </Stack>
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
               <Typography gutterBottom variant="body2">
                  <Chip label="Email : admin@naver.com" size="small" />
               </Typography>
            </DialogContent>
         </Dialog>
      </>
   )
}

export const ModalBox = ({ children, openBtn }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         <Box onClick={() => setOpen(true)}>{openBtn}</Box>
         <Modal open={open} onClose={() => setOpen(false)}>
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
                  maxHeight: '600px',
                  overflowY: 'auto',
               }}
            >
               {children}
            </Box>
         </Modal>
      </>
   )
}
