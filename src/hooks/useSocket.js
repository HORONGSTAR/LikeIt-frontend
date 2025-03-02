import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const useSocket = () => {
   const [socket, setSocket] = useState(null)
   const socketRef = useRef(null)

   useEffect(() => {
      if (!socketRef.current) {
         socketRef.current = io(process.env.REACT_APP_API_URL, {
            withCredentials: true,
         })
         socketRef.current.on('active server', (msg) => console.log(msg))
         setSocket(socketRef.current)
      }

      return () => {
         if (socketRef.current) socketRef.current.disconnect()
      }
   }, [])

   return socket
}

export default useSocket
