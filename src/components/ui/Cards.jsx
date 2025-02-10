import { Card, CardMedia, Stack, Typography, Button, Chip, Box } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { Stack2, Ellipsis } from '../../styles/BaseStyles'
import { setDDay } from '../../util/changeDate'
import { useEffect, useState } from 'react'

export const BasicCard = ({ imgUrl, children, cardEf }) => {
   const cardSx = {
      body: {
         height: '100%',
         flexDirection: { sm: 'column', xs: 'row' },
      },
      media: {
         minWidth: 100,
         minHeight: { sm: 144, xs: 90 },
      },
      stack: { p: { md: 2, sm: 1.4, xs: 1 }, width: { sm: 'auto', xs: '100%' } },
   }

   return (
      <Box sx={cardEf}>
         <Card sx={cardSx.body}>
            <CardMedia image={imgUrl || '/images/notFindImg.png'} sx={cardSx.media} />
            <Stack sx={cardSx.stack}>{children}</Stack>
         </Card>
      </Box>
   )
}

export const ProjectCard = ({ project }) => {
   const date = setDDay(project.endDate)

   const cententSx = {
      title: {
         fontWeight: 600,
         height: { md: 48, sm: 'auto' },
      },
      favorite: {
         fontSize: { sm: 24, xs: 18 },
      },
      percent: {
         fontFamily: 'BMJUA',
         fontSize: { sm: 20, xs: 16 },
         lineHeight: { sm: '20px', xs: '16px' },
      },
   }

   return (
      <BasicCard imgUrl={project.imgUrl}>
         <Typography variant="caption">BY.{project.studioName}</Typography>
         <Ellipsis $line={2}>
            <Typography sx={cententSx.title}>{project.title}</Typography>
         </Ellipsis>
         <Ellipsis>
            <Typography variant="body2" color="grey">
               {project.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Chip variant={date > 3 ? 'grey' : 'green'} label={date + '일 남음'} />
            <Stack2 ml="auto" alignItems="end">
               <Favorite color="yellow" sx={cententSx.favorite} />
               <Typography sx={cententSx.percent}>{project.rate}%</Typography>
            </Stack2>
         </Stack2>
      </BasicCard>
   )
}

export const CommingCard = ({ project }) => {
   const cententSx = {
      title: {
         fontWeight: 600,
         height: { md: 48, sm: 'auto' },
      },
      intro: {
         display: { sm: 'block', xs: 'none' },
      },
   }

   return (
      <BasicCard imgUrl={project.imgUrl}>
         <Typography variant="caption">BY.{project.studioName}</Typography>
         <Ellipsis $line={2}>
            <Typography sx={cententSx.title}>{project.title}</Typography>
         </Ellipsis>
         <Ellipsis>
            <Typography variant="body2" color="grey" sx={cententSx.intro}>
               {project.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Typography color="orenge" variant="caption">
               {project.userCount}명 알림 신청 중
            </Typography>
            <Button fullWidth variant="outlined" sx={{ p: 0, m: 0 }} startIcon={<Box component="img" src="/images/icon/bell.svg" alt="알림버튼" sx={{ height: 12 }} />}>
               알림 신청하기
            </Button>
         </Stack2>
      </BasicCard>
   )
}

export const HistoryCard = ({ project }) => {
   const [cardEf, setCardEf] = useState(null)

   useEffect(() => {
      const sx = {}
      if (project.state !== 'ON_FUNDING') sx.opacity = 0.5
      if (project.state === 'FUNDING_FAILED') sx.filter = 'grayscale(100%)'
      setCardEf(sx)
   }, [project.state])

   const cententSx = {
      title: {
         fontWeight: 600,
         height: { md: 48, sm: 'auto' },
      },
      favorite: {
         fontSize: { md: 24, sm: 16, xs: 18 },
      },
      percent: {
         fontFamily: 'BMJUA',
         fontSize: { md: 20, sm: 14, xs: 16 },
         lineHeight: { md: '20px', sm: '14px', xs: '16px' },
      },
   }

   const chipDt = {
      ON_FUNDING: { color: 'green', label: '진행 중' },
      FUNDING_COMPLE: { color: 'yellow', label: '펀딩 성공' },
      FUNDING_FAILED: { color: 'grey', label: '펀딩 실패' },
   }

   return (
      <BasicCard imgUrl={project.imgUrl} cardEf={cardEf}>
         <Typography variant="caption">BY.{project.studioName}</Typography>
         <Ellipsis $line={2}>
            <Typography sx={cententSx.title}>{project.title}</Typography>
         </Ellipsis>
         <Ellipsis>
            <Typography variant="body2" color="grey">
               {project.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Chip variant={chipDt[project.state].color} label={chipDt[project.state].label} />
            <Stack2 ml="auto" alignItems="end">
               <Favorite color="yellow" sx={cententSx.favorite} />
               <Typography sx={cententSx.percent}>67%</Typography>
            </Stack2>
         </Stack2>
      </BasicCard>
   )
}

export const StudioCard = ({ studio }) => {
   const cententSx = {
      intro: {
         display: { sm: 'block', xs: 'none' },
      },
   }
   return (
      <BasicCard imgUrl={studio.imgUrl}>
         <Ellipsis $line={2}>
            <Typography variant="h6">{studio.name}</Typography>
         </Ellipsis>
         <Ellipsis $line={2}>
            <Typography variant="body2" color="grey" sx={cententSx.intro}>
               {studio.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Typography variant="body2">구독자수 {studio.follow}명</Typography>
            <Button fullWidth variant="outlined">
               스튜디오 방문하기
            </Button>
         </Stack2>
      </BasicCard>
   )
}
