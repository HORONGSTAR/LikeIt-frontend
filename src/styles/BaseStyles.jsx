import * as React from 'react'
import styled from 'styled-components'
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   Modal,
   Box,
   IconButton,
   Stack,
   CircularProgress,
   Dialog,
   DialogContent,
   DialogTitle,
   Container,
   Button,
   Link as MuiLink,
   CardHeader,
   Chip,
   Divider,
} from '@mui/material'
import { Close, PlayArrowRounded, AddPhotoAlternate } from '@mui/icons-material'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export const Main = ({ children, spacing }) => {
   return (
      <Container maxWidth="md" sx={{ my: 2, px: { sm: 2, xs: 0.5 }, py: 2, background: '#fff', borderRadius: 3 }}>
         <Stack spacing={spacing || 2}>{children}</Stack>
      </Container>
   )
}

export const SubTitle = ({ children, to }) => {
   return (
      <Stack2 pt={3}>
         <Typography variant="h4" component={Link} to={to}>
            {children}
         </Typography>
         <PlayArrowRounded color="primary" />
      </Stack2>
   )
}

export const Dot = ({ children, both, float, size }) => {
   const dotSx = {
      display: 'block',
      width: size || 5,
      height: size || 5,
      background: '#222',
      borderRadius: '50%',
      m: 1,
      position: float && 'absolute',
      left: -20,
   }

   return (
      <Box display={'flex'}>
         <Stack2 sx={{ position: 'relative' }}>
            <Box sx={{ ...dotSx, left: -20 }} />
            {children}
            {both && <Box sx={{ ...dotSx, right: -20 }} />}
         </Stack2>
      </Box>
   )
}

export const TextLink = (props) => {
   return <MuiLink underline="hover" component={Link} fontWeight="bold" {...props} />
}

export const Stack2 = (props) => {
   return <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap' }} {...props} />
}

export const LoadingBox = ({ heightValue }) => {
   return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: heightValue || '120px' }}>
         <CircularProgress color="yellow" size={50} />
      </Stack>
   )
}

export const ModalBox = ({ children, openBtn, closeBtn, full }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         <Box onClick={() => setOpen(true)}>{openBtn}</Box>
         <Modal open={open} onClose={() => closeBtn || setOpen(false)}>
            <Box
               sx={{
                  position: 'absolute',
                  boxSizing: 'border-box',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { sm: full ? 600 : 320, xs: '100%' },
                  minWidth: 320,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 24,
                  px: 2,
                  py: 4,
                  maxHeight: { sm: full ? '100%' : 600, xs: '100%' },
                  overflowY: 'auto',
               }}
            >
               <IconButton
                  aria-label="close"
                  onClick={() => {
                     setOpen(false)
                  }}
                  sx={(theme) => ({
                     position: 'absolute',
                     right: 0,
                     top: 0,
                     color: theme.palette.grey[500],
                  })}
               >
                  <Close />
               </IconButton>
               {children}
            </Box>
         </Modal>
      </>
   )
}

export const ModifiedModalBox = ({ children, openBtn, closeBtn }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         {React.cloneElement(openBtn, { onClick: () => setOpen(true) })}
         <Modal open={open} onClose={() => closeBtn || setOpen(false)}>
            <Box
               sx={{
                  position: 'absolute',
                  boxSizing: 'border-box',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minWidth: 320,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 24,
                  px: 2,
                  py: 3,
                  maxHeight: 600,
                  overflowY: 'auto',
               }}
            >
               <IconButton
                  aria-label="close"
                  onClick={() => setOpen(false)}
                  sx={(theme) => ({
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: theme.palette.grey[500],
                  })}
               >
                  <Close />
               </IconButton>
               {children}
            </Box>
         </Modal>
      </>
   )
}

export const ErrorBox = ({ error, open, setOpen }) => {
   return (
      <>
         <Dialog
            onClose={() => {
               setOpen(false)
            }}
            aria-labelledby="에러 메세지"
            open={open}
         >
            <DialogTitle sx={{ m: 0, p: 2 }} id="에러 메세지">
               에러 메세지
            </DialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => {
                  setOpen(false)
               }}
               sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
               })}
            >
               <Close />
            </IconButton>
            <DialogContent dividers>
               <Typography gutterBottom color="error">
                  {error}
               </Typography>
               <Typography gutterBottom variant="body2">
                  문제가 계속 해결되지 않을 경우 관리자에게 문의 부탁드립니다.
               </Typography>
               <Typography gutterBottom variant="body2"></Typography>
            </DialogContent>
         </Dialog>
      </>
   )
}

export const ImgUploadBox = ({ setImgFile, imgUrl, setImgUrl, children }) => {
   const handleImageChange = useCallback(
      (e) => {
         const file = e.target.files && e.target.files[0]
         if (!file) return

         setImgFile(file)
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = (event) => {
            setImgUrl(event.target.result)
         }
      },
      [setImgFile, setImgUrl]
   )

   return (
      <Stack2 alignItems="end">
         <Button
            component="label"
            sx={{
               width: 150,
               height: 150,
               justifyContent: 'center',
               overflow: 'hidden',
               background: '#666',
               p: 0,
            }}
            variant="contained"
         >
            <Stack
               sx={{
                  position: 'absolute',
                  zIndex: 1,
                  alignItems: 'center',
                  borderRadius: 5,
                  background: 'rgba(0,0,0,0.40)',
                  p: 1,
               }}
            >
               <AddPhotoAlternate />
               사진 추가
            </Stack>
            <Box
               component={imgUrl ? 'img' : 'div'}
               src={imgUrl || null}
               alt="프로필 이미지"
               sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.8,
                  background: '#fff',
                  zIndex: 0,
               }}
            />
            <Box display="none">
               <input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
         </Button>
         <Typography variant="body2" sx={{ display: 'block', m: 1, color: 'grey' }}>
            {children}
         </Typography>
      </Stack2>
   )
}

export const Ellipsis = styled.div`
   width: 100%;
   text-overflow: ellipsis;
   overflow: hidden;
   word-break: break-word;
   display: -webkit-box;
   -webkit-line-clamp: ${(props) => props.$line || 1};
   -webkit-box-orient: vertical;
   @media (max-width: 500px) {
      -webkit-line-clamp: 1;
   }
`

export const FundingCard = ({ orders, point, totalOrderPrice }) => {
   return (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 2,
            boxShadow: 2,
            filter: orders.orders[0].orderStatus === 'FUNDING_FAILED' ? 'grayscale(100%)' : 'none',
            opacity: orders.orders[0].orderStatus === 'FUNDING_FAILED' ? 0.5 : 1,
            backgroundColor: orders.orders[0].orderStatus === 'FUNDING_FAILED' ? '#eee' : 'white',
         }}
      >
         <CardHeader
            title={orders.orders[0].Project?.title}
            subheader={
               <Typography color="grey" variant="caption">
                  주문 시각 : {new Date(orders.orderTime).toLocaleString()}
               </Typography>
            }
            sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}
         />
         <Stack2>
            {orders.orders[0].Project?.imgUrl && (
               <CardMedia
                  component="img"
                  sx={{ width: 140, borderRadius: 1, m: 2 }}
                  image={`${process.env.REACT_APP_API_URL}/projectImg${orders.orders[0].Project.imgUrl}` || null}
                  alt={orders.orders[0].Project.title}
               />
            )}
            <CardContent>
               {orders.orders.map((order, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'row', pb: 1 }}>
                     <Stack>
                        <Stack2>
                           <Typography fontWeight={600}>{order.Reward.name}</Typography>
                           <Typography variant="body2" color="grey">
                              &nbsp;× {order.orderCount}
                           </Typography>
                        </Stack2>
                        <Typography variant="body2" color="green">
                           {Number(order.orderPrice).toLocaleString('ko-KR')}원
                        </Typography>
                     </Stack>
                  </Box>
               ))}
            </CardContent>
            <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
               {orders.orders[0].orderStatus === 'ON_FUNDING' && <Chip variant="yellow" sx={{ p: 2 }} label={'펀딩진행중'} />}
               {orders.orders[0].orderStatus === 'FUNDING_COMPLETE_PAID' && <Chip variant="yellow" sx={{ p: 2 }} label={'펀딩성공/결제완료'} />}
               {orders.orders[0].orderStatus === 'FUNDING_COMPLETE_NOT_PAID' && <Chip variant="grey" sx={{ p: 2 }} label={'펀딩성공/결제실패'} />}
               {orders.orders[0].orderStatus === 'FUNDING_FAILED' && <Chip variant="grey" sx={{ p: 2 }} label={'펀딩실패'} />}
               {orders.orders[0].orderStatus === 'DELIVERY_WAITING' && <Chip variant="green" sx={{ p: 2 }} label={'전달준비중'} />}
               {orders.orders[0].orderStatus === 'DELIVERY_STARTED' && <Chip variant="green" sx={{ p: 2 }} label={'전달시작'} />}
               {orders.orders[0].orderStatus === 'DELIVERY_COMPLETE' && <Chip variant="green" sx={{ p: 2 }} label={'전달완료'} />}
               {orders.orders[0].orderStatus === 'DELIVERY_COMPLETE' && (
                  <Link>
                     <BorderColorIcon />
                     후기 작성하기
                  </Link>
               )}
            </Box>
         </Stack2>
         <Divider variant="middle" />
         <Stack2 py={1} px={2} justifyContent="space-between">
            <Typography fontSize={16}>
               <b>합계</b> {Number(totalOrderPrice).toLocaleString('ko-KR')}원
            </Typography>
            <Typography variant="body2">{point} 포인트 사용</Typography>
         </Stack2>
      </Card>
   )
}
