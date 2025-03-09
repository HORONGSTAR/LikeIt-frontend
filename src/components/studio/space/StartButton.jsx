import { useState, useCallback } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Mic } from '@mui/icons-material'

function StartButton({ socket, studioId, start }) {
   const [open, setOpen] = useState(false)
   const [noMic, setNoMic] = useState(false)

   const startSpace = useCallback(() => {
      setOpen(false)
      navigator.mediaDevices
         .getUserMedia({ audio: true })
         .then(() => studioId && socket.emit('create space', studioId))
         .catch(() => setNoMic(true))

      return () => {
         socket.off('create space', studioId)
      }
   }, [socket, studioId])

   return (
      <>
         {open && (
            <Dialog open={open}>
               <DialogTitle>음성 스페이스 생성</DialogTitle>
               <DialogContent>
                  <img src="/images/space.png" width="300" alt="스페이스를 통한 교류" />
                  <DialogContentText>스페이스를 열어 스튜디오 구독자들과 소통할까요?</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="orenge" disabled={!socket} onClick={startSpace}>
                     확인
                  </Button>
                  <Button onClick={() => setOpen(false)}>취소</Button>
               </DialogActions>
            </Dialog>
         )}
         {noMic && (
            <Dialog open={noMic}>
               <DialogTitle>마이크 연결 필요</DialogTitle>
               <DialogContent>
                  <img src="/images/notFindImg.png" width="300" alt="스페이스를 통한 교류" />
                  <DialogContentText>연결된 마이크가 없습니다. 마이크를 연결한 뒤 다시 시도해주세요.</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={() => setNoMic(false)}>확인</Button>
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
            disabled={start}
         >
            <Mic sx={{ fontSize: '20px' }} /> 스페이스
         </Button>
      </>
   )
}
export default StartButton
