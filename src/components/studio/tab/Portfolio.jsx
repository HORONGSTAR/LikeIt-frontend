import { Box, Stack, Avatar, Typography, Card, CardMedia, CardContent, Button, Divider, Link } from '@mui/material'
import { Stack2, Dot, Ellipsis } from '../../../styles/BaseStyles'
import { TabLink } from '../../ui/Tabs'
import { Timeline, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'
import dayjs from 'dayjs'

function Portfolio({ items }) {
   const createInfo = (
      <Stack my={5} spacing={2}>
         <Dot float>
            <Typography variant="h4">창작자 소개</Typography>
         </Dot>
         <Stack2 spacing={2}>
            {items.creators.map((creator) => (
               <Stack key={'creator' + creator.User.id} alignItems="center">
                  <Avatar sx={{ width: 128, height: 128 }} src={process.env.REACT_APP_API_URL + '/userImg/' + creator.User.imgUrl} />
                  <Typography>{creator.User.name}</Typography>
               </Stack>
            ))}
         </Stack2>
      </Stack>
   )
   const newProject = (
      <Stack my={5} spacing={2}>
         <Dot float>
            <Typography variant="h4">최근 프로젝트</Typography>
         </Dot>
         {items.new ? (
            <Card
               variant="outlined"
               sx={{ borderRadius: 0, width: '100%', my: 4, display: 'flex', flexDirection: { sm: 'row-reverse', xs: 'column' } }}
            >
               <CardMedia image={process.env.REACT_APP_API_URL + '/projectImg/' + items.new.imgUrl} sx={{ width: '45%', minHeight: 240 }} />
               <CardContent sx={{ width: '55%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ flexGrow: 1 }}>
                     <Typography fontSize={32} fontWeight={600}>
                        {items.new.title}
                     </Typography>
                     <Typography>{items.new.contents}</Typography>
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                     <Button fullWidth variant="contained">
                        프로젝트 펀딩 페이지로 이동
                     </Button>
                  </Box>
               </CardContent>
            </Card>
         ) : (
            '게시한 프로젝트가 없습니다.'
         )}
      </Stack>
   )
   const timeLine = (
      <Stack my={5} spacing={2}>
         <Dot float>
            <Typography variant="h4">타임라인</Typography>
         </Dot>
         {items.projects.map((project, index) => (
            <Timeline
               key={project.id}
               sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                     flex: 0,
                     padding: 0,
                  },
                  [`& .${timelineOppositeContentClasses.root}`]: {
                     flex: 0.2,
                  },
               }}
            >
               <TimelineItem sx={{ alignItems: 'center' }}>
                  <TimelineOppositeContent sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>
                     <Typography variant="body1" color="grey">
                        {dayjs(project.startDate).format('YYYY.MM.DD')}
                     </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                     <Avatar
                        sx={{ width: { sm: 100, xs: 40 }, height: { sm: 100, xs: 40 }, m: 1 }}
                        src={process.env.REACT_APP_API_URL + '/projectImg/' + project.imgUrl}
                     />
                     {index < items.projects.length - 1 && <TimelineConnector sx={{ minHeight: { sm: 50, xs: 70 }, mb: -3.5 }} />}
                  </TimelineSeparator>
                  <TimelineContent>
                     <Typography variant="body2" color="grey" sx={{ display: { md: 'none', sm: 'block', xs: 'block' } }}>
                        {dayjs(project.startDate).format('YYYY.MM.DD')}
                     </Typography>
                     <Ellipsis>
                        <Typography variant="h6">{project.title}</Typography>
                     </Ellipsis>
                     <Ellipsis>
                        <Typography variant="body2">{project.intro}</Typography>
                     </Ellipsis>
                     <Typography fontWeight="bold" color="green">
                        {Math.floor((project.totalOrderPrice / project.goal) * 100)}% 달성
                     </Typography>
                  </TimelineContent>
               </TimelineItem>
            </Timeline>
         ))}
      </Stack>
   )
   const snsLink = {
      X: { label: '트위터', icon: 'twitter.svg' },
      YOUTUBE: { label: '유튜브', icon: 'youtube.svg' },
      INSTAGRAM: { label: '인스타그램', icon: 'instagram.svg' },
   }

   const contect = (
      <Stack my={5} spacing={2}>
         <Dot float>
            <Typography variant="h4">문의처</Typography>
         </Dot>
         <Card variant="outlined" p={0}>
            <CardContent sx={{ paddingBottom: '16px !important' }}>
               <Stack2 sx={{ gap: '0 15px' }}>
                  <Typography fontWeight={600}>스튜디오</Typography>
                  <Typography>{items.contects.name}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography fontWeight={600}>SNS</Typography>
                  {items.contects.sns.map((sns) => (
                     <Link key={'contect' + sns.id} underline="none" target="_blank" href={sns.contents} rel="noopener noreferrer">
                        <Stack2 spacing={0.5}>
                           <Box component="img" sx={{ height: 16 }} src={`/images/icon/${snsLink[sns.type].icon}`} />
                           <Typography color="grey">{snsLink[sns.type].label}</Typography>
                        </Stack2>
                     </Link>
                  ))}
               </Stack2>
            </CardContent>
         </Card>
      </Stack>
   )

   const links = [
      { name: '창작자 소개', section: createInfo },
      { name: '최근 프로젝트', section: newProject },
      { name: '타임라인', section: timeLine },
      { name: '문의처', section: contect },
   ]
   return <TabLink links={links} />
}

export default Portfolio
