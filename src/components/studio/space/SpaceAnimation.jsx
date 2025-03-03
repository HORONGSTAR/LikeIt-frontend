import { useState, useEffect, useRef } from 'react'
import { Stack, Box, Typography, Slider } from '@mui/material'
import { Stack2 } from '../../../styles/BaseStyles'
import { Mic, VolumeUp, VolumeOff } from '@mui/icons-material'

export const SpaceScreen = ({ adminName, children, stream, audio }) => {
   const [volume, setVolume] = useState(50)
   const [speaking, setSpeaking] = useState(1)
   console.log(stream)

   useEffect(() => {
      if (!stream) return
      console.log(stream)
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)

      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const checkVolume = () => {
         analyser.getByteFrequencyData(dataArray)
         let sum = dataArray.reduce((a, b) => a + b, 0)
         let average = sum / bufferLength

         setSpeaking(average)
         requestAnimationFrame(checkVolume)
      }
      checkVolume()
   }, [stream])

   return (
      <Stack spacing={2} direction={{ sm: 'column', xs: 'row' }} alignItems="center">
         <Stack2
            sx={{
               justifyContent: 'center',
               width: { sm: 180, xs: 140 },
               height: { sm: 180, xs: 140 },
            }}
         >
            <Stack2
               sx={{
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `linear-gradient(${speaking * 3}deg, ${speaking > 20 ? '#FFCC4D' : '#4ACBCF'}, #A57EFF)`,
                  p: speaking > 20 ? 2 : 1.1,
                  transition: '0.2s',
               }}
            >
               {children}
            </Stack2>
         </Stack2>
         <Stack alignItems={{ sm: 'center', xs: 'start' }}>
            <Stack alignItems="center" spacing={1} direction={{ sm: 'column', xs: 'row' }}>
               <Typography variant="body2" color="textSecondary">
                  진행자
               </Typography>
               <Typography variant="h6">{adminName}</Typography>
            </Stack>
            <Stack alignItems="center">
               {audio}
               <Stack2 sx={{ width: { md: 170, sm: 150, xs: 130 }, mt: 1 }}>
                  {volume === 0 ? <VolumeOff sx={{ fontSize: 32, mr: 1, color: '#666' }} /> : <VolumeUp sx={{ fontSize: 32, mr: 1, color: '#666' }} />}
                  <Slider
                     value={volume}
                     onChange={(e, newValue) => setVolume(newValue)}
                     aria-labelledby="volume-slider"
                     min={0}
                     max={100}
                     sx={{
                        color: '#666',
                        '& .MuiSlider-thumb': { backgroundColor: '#666' },
                        '& .MuiSlider-track': { backgroundColor: '#666' },
                     }}
                  />
               </Stack2>
               <Typography variant="body2" color="textSecondary" sx={{ display: { sm: 'block', xs: 'none' } }}>
                  볼륨: {volume}%
               </Typography>
            </Stack>
         </Stack>
      </Stack>
   )
}

export const MoveTitle = ({ studioName, children }) => {
   const boxRef = useRef(null)
   const [width, setWidth] = useState(0)
   useEffect(() => {
      const observer = new ResizeObserver((entries) => {
         if (entries[0]) setWidth(entries[0].contentRect.width)
      })

      if (boxRef.current) observer.observe(boxRef.current)
      return () => observer.disconnect()
   }, [])

   return (
      <Stack2 ref={boxRef} sx={{ width: '100%', overflow: 'hidden', px: 1 }}>
         <Mic />
         <Stack direction={{ md: 'row', sm: 'column', xs: 'column' }} sx={{ overflow: 'hidden', width: '100%' }}>
            <Stack2>
               <Typography className={studioName.length * 16 + 88 > width && 'spacebar-title'} fontSize={16} fontWeight={500}>
                  {studioName}의 스페이스&nbsp;&nbsp;&nbsp;&nbsp;
                  <Typography className={studioName.length * 16 + 88 > width || 'spacebar-title-copy'} component="span" sx={{ position: 'absolute' }} fontSize={16} fontWeight={500}>
                     {studioName}의 스페이스&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
               </Typography>
            </Stack2>
            <Stack2>
               <Box sx={{ display: { md: 'block', sm: 'none', xs: 'none' }, height: '1px', background: '#fff', width: '20px', mr: 2 }} />
               {children}
            </Stack2>
         </Stack>
      </Stack2>
   )
}
