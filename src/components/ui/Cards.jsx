import { Card, CardMedia, Stack, Typography, Button, Chip, Box, IconButton } from '@mui/material'
import { Favorite, Create, Delete } from '@mui/icons-material'
import { Stack2, Ellipsis, ModalBox } from '../../styles/BaseStyles'
import { setDDay } from '../../util/changeDate'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/system'

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
      <Link to={`/funding/${project.id}`}>
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
      </Link>
   )
}

export const AdminCard = ({ project, adminFunc }) => {
   const [denyMsg, setDenyMsg] = useState('')
   const [ImgFile, setImgFile] = useState(null)
   const [ImgUrl, setImgUrl] = useState('')
   const date = setDDay(project.endDate)

   const handleImgChange = useCallback((e) => {
      const file = e.target.files[0]
      if (!file) return

      setImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   // 이미지 등록 버튼용
   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   })

   let proposalStatus = ''
   let proposalColor = ''
   if (project.proposalStatus === 'COMPLETE') {
      proposalStatus = '승인완료'
      proposalColor = 'green'
   } else if (project.proposalStatus === 'REVIEW_REQ') {
      proposalStatus = '승인대기중'
      proposalColor = 'outlined'
   } else if (project.proposalStatus === 'DENIED') {
      proposalStatus = '승인거부'
      proposalColor = 'yellow'
   }

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
            <Link to={`/funding/${project.id}`}>
               <Typography sx={cententSx.title}>{project.title}</Typography>
            </Link>
         </Ellipsis>
         <Ellipsis>
            <Typography variant="body2" color="grey">
               {project.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Chip variant={proposalColor} label={proposalStatus} />
            <Stack2 ml="auto" alignItems="end">
               <Favorite color="yellow" sx={cententSx.favorite} />
               <Typography sx={cententSx.percent}>{project.rate}%</Typography>
            </Stack2>
         </Stack2>
         {/* 높이 맞춤용 */}
         {proposalStatus === '승인거부' ? <Chip sx={{ visibility: 'hidden' }} /> : null}
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            {proposalStatus === '승인대기중' && (
               <>
                  {/* 승인허가 모달박스 */}
                  <ModalBox openBtn={<Chip variant="outlined" sx={{ marginRight: '8px', cursor: 'pointer' }} label={'승인허가'} />} closeBtn>
                     <Typography>이 프로젝트의 펀딩을 승인하시겠습니까?</Typography>
                     <Button variant="outlined" onClick={() => adminFunc.proposalPass(project.id)}>
                        승인허가
                     </Button>
                  </ModalBox>
                  {/* 승인거부 모달박스 */}
                  <ModalBox openBtn={<Chip variant="outlined" sx={{ marginRight: '8px', cursor: 'pointer' }} label={'승인거부'} />} closeBtn>
                     <Typography>이 프로젝트의 펀딩을 거부하시겠습니까?</Typography>
                     <textarea
                        placeholder="펀딩을 허가하지 않는 이유를 작성해주세요"
                        style={{ width: '90%', marginTop: '8px', padding: '8px' }}
                        value={denyMsg}
                        onChange={(e) => setDenyMsg(e.target.value)}
                     ></textarea>
                     <br />
                     <Button variant="outlined" onClick={() => adminFunc.proposalDeny(project.id, denyMsg)}>
                        승인거부
                     </Button>
                  </ModalBox>
               </>
            )}
            {proposalStatus === '승인완료' && !project.bannerId && (
               <ModalBox openBtn={<Chip variant="outlined" sx={{ marginRight: '8px', cursor: 'pointer' }} label={'홈 배너노출 등록'} />} closeBtn>
                  <Typography>배너 등록을 진행하시겠습니까</Typography>
                  {ImgUrl && <img src={ImgUrl} alt="업로드 이미지 미리보기" style={{ width: '100%' }} />}
                  <Button component="label" role={undefined} variant="contained" tabIndex={-1} sx={{ marginLeft: '0' }}>
                     배너 이미지
                     <VisuallyHiddenInput type="file" onChange={handleImgChange} name="banner" />
                  </Button>
                  <Button
                     variant="outlined"
                     onClick={() => {
                        if (!ImgFile) return
                        const formData = new FormData()
                        formData.append('id', project.id)
                        formData.append('banner', ImgFile)
                        adminFunc.bannerReg(formData)
                     }}
                  >
                     등록
                  </Button>
               </ModalBox>
            )}
            {proposalStatus === '승인완료' && project.bannerId && (
               <ModalBox openBtn={<Chip variant="outlined" sx={{ marginRight: '8px', cursor: 'pointer' }} label={'홈 배너노출 해제'} />} closeBtn>
                  <Typography>배너 해제를 진행하시겠습니까</Typography>
                  <Button variant="outlined" onClick={() => adminFunc.bannerDel(project.bannerId)}>
                     해제
                  </Button>
               </ModalBox>
            )}
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
      <Link to={`/funding/${project.id}`}>
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
               {project.isFavorite ? (
                  <Button
                     fullWidth
                     variant="contained"
                     sx={{ p: 0, m: 0 }}
                     onClick={(e) => {
                        e.preventDefault()
                        project.isFavorite = !project.isFavorite
                        project.userCount -= 1
                        project.noticeDel(project.id)
                     }}
                     startIcon={<Box component="img" src="/images/icon/bell.svg" alt="알림버튼" sx={{ height: 12, filter: 'grayscale(100%) brightness(1000%)' }} />}
                  >
                     알림 신청중
                  </Button>
               ) : (
                  <Button
                     fullWidth
                     variant="outlined"
                     sx={{ p: 0, m: 0 }}
                     onClick={(e) => {
                        e.preventDefault()
                        project.isFavorite = !project.isFavorite
                        project.userCount += 1
                        project.isAuthenticated ? project.noticeReg(project.id) : (window.location.href = '/login')
                     }}
                     startIcon={<Box component="img" src="/images/icon/bell.svg" alt="알림버튼" sx={{ height: 12 }} />}
                  >
                     알림 신청하기
                  </Button>
               )}
            </Stack2>
         </BasicCard>
      </Link>
   )
}

export const HistoryCard = ({ project, studioName }) => {
   const [cardEf, setCardEf] = useState(null)

   useEffect(() => {
      const sx = {}
      if (project.projectStatus !== 'ON_FUNDING') sx.opacity = 0.5
      if (project.projectStatus === 'FUNDING_FAILED') sx.filter = 'grayscale(100%)'
      setCardEf(sx)
   }, [project.projectStatus])

   const cententSx = {
      title: {
         fontWeight: 600,
         height: { md: 48, sm: 'auto' },
      },
      favorite: {
         fontSize: { sm: 22, xs: 18 },
      },
      percent: {
         fontFamily: 'BMJUA',
         fontSize: { sm: 18, xs: 16 },
         lineHeight: { sm: '18px', xs: '16px' },
      },
   }

   const chipDt = {
      ON_FUNDING: { color: 'green', label: '진행 중' },
      FUNDING_COMPLETE: { color: 'yellow', label: '펀딩 성공' },
      FUNDING_FAILED: { color: 'grey', label: '펀딩 실패' },
   }

   return (
      <BasicCard imgUrl={process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl} cardEf={cardEf}>
         <Typography variant="caption">BY.{studioName}</Typography>
         <Ellipsis $line={2}>
            <Typography sx={cententSx.title}>{project.title}</Typography>
         </Ellipsis>
         <Ellipsis>
            <Typography variant="body2" color="grey">
               {project.intro}
            </Typography>
         </Ellipsis>
         <Stack2 mt={{ sm: 1, xs: 0.5 }}>
            <Chip variant={chipDt[project.projectStatus]?.color} label={chipDt[project.projectStatus]?.label} />
            <Stack2 ml="auto" alignItems="end">
               <Favorite color="yellow" sx={cententSx.favorite} />
               <Typography sx={cententSx.percent}>{Math.floor((project.totalOrderPrice / project.goal) * 100)}%</Typography>
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
            <Button fullWidth variant="outlined" onClick={() => (window.location.href = `/studio/${studio.id}`)}>
               스튜디오 방문하기
            </Button>
         </Stack2>
      </BasicCard>
   )
}

export const ListCard = ({ product, children }) => {
   return (
      <Card variant="outlined" key={'product' + product.id}>
         <CardMedia image={product?.imgUrl ? process.env.REACT_APP_API_URL + '/rewardProduct/' + product.imgUrl : ''} sx={{ minHeight: 90, minWidth: 100 }} />
         <Stack p={1} spacing={1} width="100%">
            <Stack2>
               <Typography fontWeight={600}>{product.title}</Typography>
               <Box ml="auto">{children}</Box>
            </Stack2>
            <Typography variant="body2" color="grey" noWrap>
               {product.contents}
            </Typography>
         </Stack>
      </Card>
   )
}
