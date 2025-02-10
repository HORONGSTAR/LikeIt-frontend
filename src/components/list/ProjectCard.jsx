import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

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

   return (
      project && (
         <Card
            sx={{
               width: {
                  xs: 'auto',
                  sm: '100%',
               },
               height: {
                  xs: '150px',
                  sm: '100%',
               },
               m: 0.5,
               display: {
                  xs: 'flex',
                  sm: 'block',
               },
            }}
         >
            <CardMedia
               component="img"
               alt="projectCard"
               image={process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl}
               sx={{
                  height: {
                     xs: '100%',
                     sm: '150px',
                  },
                  width: {
                     xs: '30%',
                     sm: '100%',
                  },
                  objectFit: 'cover',
               }}
            />
            <Box
               sx={{
                  width: {
                     xs: '70%',
                     sm: '100%',
                  },
               }}
            >
               <CardContent sx={{ p: 1 }}>
                  <Typography
                     sx={{
                        height: {
                           xs: '20px',
                           sm: '30px',
                        },
                        my: 0.5,
                     }}
                  >
                     By.{project.Studio.name}
                  </Typography>

                  <Typography
                     gutterBottom
                     variant="h5"
                     component="div"
                     sx={{
                        height: {
                           xs: '30px',
                           sm: '40px',
                        },
                        display: '-webkit-box',
                        wordWrap: 'break-word',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: {
                           xs: 0,
                           sm: 2,
                        },
                     }}
                  >
                     {project.title}
                  </Typography>

                  <Typography
                     variant="body2"
                     sx={{
                        height: {
                           xs: '30px',
                           sm: '50px',
                        },
                        color: 'text.secondary',
                        display: '-webkit-box',
                        wordWrap: 'break-word',
                        WebkitLineClamp: {
                           xs: '2',
                           sm: '3',
                        },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                     }}
                  >
                     {/* 공개예정 프로젝트와 나머지 프로젝트 */}
                     {type === 'comming' ? `${project.userCount}명 알림 신청중` : project.contents}
                  </Typography>
               </CardContent>
               <CardActions
                  sx={{
                     position: 'relative',
                  }}
               >
                  {type === 'comming' ? (
                     <Button
                        sx={{
                           width: '100%',
                           backgroundColor: '#eeeeee',
                           borderRadius: '16px',
                        }}
                     >
                        <img src={process.env.REACT_APP_FRONT_URL + '/images/icon/bell.svg'} alt="Bell" style={{ height: '14px', marginRight: '3px' }} />
                        알림 신청
                     </Button>
                  ) : (
                     <>
                        <Button
                           size="small"
                           sx={{
                              backgroundColor: '#eeeeee',
                              borderRadius: '16px',
                           }}
                        >
                           {diffDay}일 남음
                        </Button>
                        <Button
                           size="small"
                           sx={{
                              fontSize: '16px',
                              position: 'absolute',
                              right: '0',
                              mx: 0.5,
                           }}
                        >
                           <img src={process.env.REACT_APP_FRONT_URL + '/images/yellowHeart.png'} alt="Heart" style={{ marginRight: '3px' }} />
                           {rate}%
                        </Button>
                     </>
                  )}
               </CardActions>
            </Box>
         </Card>
      )
   )
}
