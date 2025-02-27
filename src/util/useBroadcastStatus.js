import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_API_URL, {
   withCredentials: true,
})

const useBroadcastStatus = () => {
   const [isBroadcasting, setIsBroadcasting] = useState(false)

   useEffect(() => {
      // 방송 시작 감지
      socket.on('broadcastStarted', (status) => {
         setIsBroadcasting(status)
      })

      // 방송 종료 감지
      socket.on('broadcastStopped', (status) => {
         setIsBroadcasting(status)
      })

      return () => {
         socket.off('broadcastStarted')
         socket.off('broadcastStopped')
      }
   }, [])

   return isBroadcasting
}

export default useBroadcastStatus
