import { useState, useCallback, useRef, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DateField } from '@mui/x-date-pickers/DateField'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { Box, Grid2, Stack, Typography, Chip } from '@mui/material'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.extend(isBetween)

function SeleteDate(props) {
   const { start, end, day, outsideCurrentMonth, ...other } = props

   const daySx = {
      [start]: {
         color: '#fff',
         background: '#45843C',
         '&:hover': { color: '#fff', background: '#45843C' },
      },
   }

   const betweenSx = dayjs(day).isBetween(start, end, 'day')

   return (
      <Box sx={{ position: 'relative' }}>
         <PickersDay sx={{ zIndex: 1, ...daySx[day] }} {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />

         {betweenSx && <Box />}
      </Box>
   )
}

function DateRangePickers({ setTerm, term = {} }) {
   const [start, setStart] = useState(term.start)
   const [end, setEnd] = useState(term.end)
   const isSetDate = useRef(false)

   const handleChange = useCallback(
      (day) => {
         if (!start || (start && end)) {
            setStart(day)
            setEnd(null)
         } else {
            if (day.isBefore(start)) {
               setStart(day)
               setEnd(null)
            } else {
               setEnd(day)
               isSetDate.current = true
            }
         }
      },
      [start, end, isSetDate]
   )

   useEffect(() => {
      if (isSetDate) {
         setTerm({ start, end })
         isSetDate.current = false
      }
   }, [start, end, setTerm])

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <Grid2 container columnSpacing={1} alignItems="center">
            <Grid2 size={{ md: 7, sm: 12 }}>
               <DateCalendar
                  sx={{ width: 280, m: 0 }}
                  disableHighlightToday
                  shouldDisableDate={(day) => day.isBefore(dayjs(), 'day')}
                  value={end || start}
                  showDaysOutsideCurrentMonth
                  onChange={handleChange}
                  slots={{ day: SeleteDate }}
                  slotProps={{ day: { start, end } }}
               />
            </Grid2>

            <Grid2 size={{ md: 5, sm: 12 }} container>
               <Stack spacing={2} sx={{ width: 300 }}>
                  <DateField label="펀딩 시작일" value={start} readOnly format="YYYY년 MM월 DD일" />
                  <DateField label="펀딩 마감일" value={end} readOnly format="YYYY년 MM월 DD일" />
                  <Typography color="grey" variant="caption">
                     프로젝트 검토 기간 고려해서 시작일을 지정해주세요. <br />
                     (공휴일 제외 최대 7일 소요)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                     <Chip label="펀딩 기간" variant="green" />
                     <Typography color="green" fontSize={16} fontWeight={600}>
                        {end ? dayjs(end).diff(start, 'day') : '--'}일
                     </Typography>
                  </Box>
               </Stack>
            </Grid2>
         </Grid2>
      </LocalizationProvider>
   )
}

export default DateRangePickers
