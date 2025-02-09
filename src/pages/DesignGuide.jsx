import { Container, Grid2, Box, Typography, Chip } from '@mui/material'
import { SubTitle, Stack2, TextLink } from '../styles/BaseStyles'
import { ProjectCard, CommingCard, HistoryCard, StudioCard, BasicCard } from '../components/ui/Cards'
import Navber from '../components/shared/Navber'

function DesignGuide() {
   const sampleData = [
      {
         studioName: '꿈빛파티세리',
         title: '[발렌타인데이] 사랑을 전하는 초코볼',
         intro: '소중한 사람에게 마음을 전할 수 있는 2월 14일 발렌타인데이! 당신의 진심을 전해보세요.',
         state: 'FUNDING_FAILED',
         imgUrl: '/images/chocolate.jpg',
         startDate: '2025-01-10 00:00:00',
         endDate: '2025-02-28 00:00:00',
      },
      {
         name: '가트발레단',
         intro: '한국대학교 발레단 가트발레단입니다.\n공연과 무료 수업을 진행 중입니다. 감사합니다.',
         follow: 59,
         imgUrl: '/images/발레 1.jpg',
      },
   ]

   const Memo = ({ component, props, children }) => {
      return (
         <Box sx={{ p: 2, m: 2, mb: 8, borderRadius: 2, background: '#ffeebd' }}>
            <Typography variant="h6">{component}</Typography>
            <Typography variant="body2" color="orenge">
               <Typography component="span" variant="body2" fontWeight="700" color="brown">
                  props&nbsp;
               </Typography>
               {props}
            </Typography>
            <Typography>{children}</Typography>
         </Box>
      )
   }

   return (
      <>
         <Navber />
         <Container maxWidth="md">
            <SubTitle to="/desinguide">서브 타이틀</SubTitle>
            <Memo component={'SubTitle'} props={'children, to'}>
               홈에서 사용하는 제목입니다. props의 to를 사용해서 페이지 링크를 걸 수 있습니다.
            </Memo>
            <Stack2 spacing={2}>
               <Chip label={'Stack2 안에 들어있는 칩1'} />
               <Chip label={'Stack2 안에 들어있는 칩2'} />
            </Stack2>
            <Memo component={'Stack2'} props={'mui Stack props'}>
               기존 Mui의 Stack컴포넌트에서 기본 direction을 row로 변경했습니다. Stack에서 사용하던 props를 동일하게 사용할 수 있습니다. alignItems는
               기본적으로 center입니다.
            </Memo>
            <TextLink to="/desinguide">텍스트 링크</TextLink>
            <Memo component={'TextLink'} props={'mui Typography props'}>
               Mui의 Link와 라우터 돔의 Link를 합쳐둔 컴포넌트입니다. Mui Typography의 props와 혼용 가능합니다.
            </Memo>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                  <BasicCard>
                     <Typography>children 컴포넌트가 들어가는 자리</Typography>
                     <Typography>모든 텍스트는 반드시 Typography로 입력해주세요. </Typography>
                  </BasicCard>
               </Grid2>
            </Grid2>
            <Memo component={'BasicCard'} props={'imgUrl, children, cardEf'}>
               모든 카드의 뼈대입니다. 카드는 Mui의 Grid2와 함께 사용합니다. Grid2 size는 md: 3, sm: 6, xs: 12 을 기본으로 합니다. 필요한 카드는
               대부분 만들어뒀기 때문에 특별히 사용할 일은 없을 겁니다. imgUrl을 넣는 부분만 수정해서 사용하시면 됩니다. 반응형 작업은 모두 마친
               상태입니다.
            </Memo>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                  <ProjectCard project={sampleData[0]} />
               </Grid2>
            </Grid2>
            <Memo component={'ProjectCard'} props={'project'}>
               기본 프로젝트 카드. 디데이에 따라 칩 색이 바뀌도록 해놨으니 사용시 확인 바랍니다.
            </Memo>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                  <HistoryCard project={sampleData[0]} />
               </Grid2>
            </Grid2>
            <Memo component={'HistoryCard'} props={'project'}>
               스튜디오 페이지에서 사용하는 프로젝트 카드입니다. 프로젝트 상태에 따라 칩이 바뀌고 카드에 보정 필터를 추가합니다.
            </Memo>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                  <CommingCard project={sampleData[0]} />
               </Grid2>
            </Grid2>
            <Memo component={'CommingCard'} props={'project'}>
               공개 예정 화면에서 사용하는 카드입니다.
            </Memo>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                  <StudioCard studio={sampleData[1]} />
               </Grid2>
            </Grid2>
            <Memo component={'StudioCard'} props={'studio'}>
               구독 페이지에서 사용하는 스튜디오 계정 카드입니다.
            </Memo>
         </Container>
      </>
   )
}

export default DesignGuide
