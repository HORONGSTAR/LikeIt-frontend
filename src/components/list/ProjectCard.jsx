import { useCallback } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function ProjectCard({ project, type }) {
   // 마감일 관련
   const today = new Date()
   const endDate = new Date(project.endDate)
   const diffTime = endDate - today
   const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

   // 달성률 체크 관련
   let totalOrderPrice = 0
   if (project.totalOrderPrice) totalOrderPrice = project.totalOrderPrice
   let rate = Math.floor((totalOrderPrice / project.goal) * 100)

   return project && type == 'comming' ? (
      <Card sx={{ maxWidth: 345 }}>
         <CardMedia component="img" alt="projectCard" height="140" image={process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl} />
         <CardContent>
            <Typography>By.{project.Studio.name} </Typography>
            <Typography gutterBottom variant="h5" component="div">
               {project.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {project.userCount}명 알림 신청중
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small">알림 신청</Button>
         </CardActions>
      </Card>
   ) : (
      <Card sx={{ maxWidth: 345 }}>
         <CardMedia component="img" alt="projectCard" height="140" image={process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl} />
         <CardContent>
            <Typography>By.{project.Studio.name} </Typography>
            <Typography gutterBottom variant="h5" component="div">
               {project.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: '-webkit-box', wordWrap: 'break-word', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
               {project.contents}
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small">{diffDay}일 남음</Button>
            <Button size="small">{rate}%</Button>
         </CardActions>
      </Card>
   )
}
