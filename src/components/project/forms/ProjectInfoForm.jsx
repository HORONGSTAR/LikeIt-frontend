import { Box, Button, TextField, Grid2, Typography, Stack, Divider } from '@mui/material'
import { Dot, Stack2 } from '../../../styles/BaseStyles'
import { ImageRounded } from '@mui/icons-material'
import { useState, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DateField } from '@mui/x-date-pickers/DateField'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

function SeleteDate(props) {
   const { startDate, endDate, day, outsideCurrentMonth, ...other } = props
   const isCenter = dayjs(day).isAfter(startDate, 'day') && dayjs(day).isBefore(endDate, 'day')
   const isStart = dayjs(day).isSame(startDate, 'day')
   const isEnd = dayjs(day).isSame(endDate, 'day')

   return (
      <Box sx={{ background: isCenter && '#eee' }}>
         <PickersDay
            sx={{
               background: isStart && '#222',
               color: isStart && '#fff',
               '&:hover': {
                  color: '#fff',
                  background: '#222',
               },
            }}
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
         />
      </Box>
   )
}

function ProjectInfoForm() {
   const [imgUrl, setImgUrl] = useState('')
   const [imgFile, setImgFile] = useState(null)
   const [value, setValue] = useState(dayjs())
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)

   const handleChange = useCallback(
      (newDate) => {
         if (!startDate || (startDate && endDate)) {
            setStartDate(newDate)
            setEndDate(null)
         } else {
            if (newDate.isBefore(startDate)) {
               setEndDate(null)
               setStartDate(newDate)
            } else {
               setEndDate(newDate)
            }
         }
      },
      [startDate, endDate]
   )

   const DateRangePickers = (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <Grid2 container alignItems="center">
            <Grid2 size={{ sm: 6, xs: 12 }}>
               <DateCalendar
                  shouldDisableDate={(day) => day.isBefore(dayjs(), 'day')}
                  value={endDate || startDate}
                  showDaysOutsideCurrentMonth
                  onChange={handleChange}
                  slots={{
                     day: SeleteDate,
                  }}
                  slotProps={{
                     day: {
                        startDate,
                        endDate,
                     },
                  }}
               />
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
               <Stack spacing={3}>
                  <Stack2>
                     <Button>시작일 선택</Button>
                     <Button>마감일 선택</Button>
                  </Stack2>
                  <DateField label="펀딩 시작일" value={startDate} />
                  <DateField label="펀딩 마감일" value={endDate} />
               </Stack>
            </Grid2>
         </Grid2>
      </LocalizationProvider>
   )

   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   const Thumbnail = (
      <Stack2 spacing={1} alignItems="end">
         <Stack2
            sx={{
               width: 150,
               height: 150,
               justifyContent: 'center',
               overflow: 'hidden',
               backgroundColor: '#EEE',
               borderRadius: 2,
            }}
         >
            {imgUrl ? (
               <Box component="img" src={imgUrl} alt="프로필 이미지" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#999' }}>
                  <ImageRounded />
                  <Typography fontWeight={600}>이미지 업로드</Typography>
                  <Typography variant="body2">최대 50MB의</Typography>
               </Box>
            )}
         </Stack2>
         <Stack>
            <Button component="label" variant="contained" sx={{ width: 90 }}>
               파일 선택
               <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            <Typography variant="caption" color="grey" m={0.5}>
               [이미지 권장 사이즈]
               <br />
               가로 600px 이상, 세로 600px 이상
            </Typography>
         </Stack>
      </Stack2>
   )

   const formItems = [
      { name: '대표 이미지', input: Thumbnail },
      { name: '프로젝트 제목', input: <TextField fullWidth label="프로젝트 제목을 입력하세요." /> },
      { name: '한줄 소개', input: <TextField fullWidth label="프로젝트 한줄 소개를 작성하세요." /> },
      { name: '펀딩 일정', input: DateRangePickers },
   ]

   return (
      <>
         {formItems.map((item) => (
            <Grid2 key={item.name} container rowSpacing={1} py={1}>
               <Grid2 size={{ md: 3, sm: 12 }}>
                  <Dot>
                     <Typography variant="h5" lineHeight={2.2}>
                        {item.name}
                     </Typography>
                  </Dot>
               </Grid2>
               <Grid2 size={{ md: 9, sm: 12 }} pl={1.5}>
                  {item.input}
               </Grid2>
            </Grid2>
         ))}
      </>
   )
}

export default ProjectInfoForm
