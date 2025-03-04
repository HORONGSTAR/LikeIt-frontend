import { useState, useCallback } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Mic } from '@mui/icons-material'

function StartButton({ socket, studioId }) {
   const [open, setOpen] = useState(false)
   const startSpace = useCallback(() => {
      if (studioId) {
         socket.emit('create space', studioId)
         setOpen(false)
      }
      return () => {
         socket.off('create space', studioId)
      }
   }, [socket, studioId])

   return (
      <>
         {open && (
            <Dialog open={open}>
               <DialogTitle>음성 스페이스 시작</DialogTitle>
               <DialogContent>
                  <img src="/images/space.png" width="300" alt="스페이스를 통한 교류" />
                  <DialogContentText>스페이스를 통해 스튜디오 구독자들과 소통할까요?</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="orenge" disabled={!socket} onClick={startSpace}>
                     확인
                  </Button>
                  <Button onClick={() => setOpen(false)}>취소</Button>
               </DialogActions>
            </Dialog>
         )}
         <Button
            sx={{
               background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
               color: '#fff',
               p: 1,
            }}
            onClick={() => setOpen(true)}
         >
            <Mic sx={{ fontSize: '20px' }} /> 스페이스
         </Button>
      </>
   )
}
export default StartButton
