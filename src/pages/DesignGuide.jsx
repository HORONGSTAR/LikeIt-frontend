import { Grid2, Box, Typography, Chip, Divider, Button } from '@mui/material'
import { Main, SubTitle, Stack2, TextLink, Dot, ModalBox, LoadingBox, ErrorBox } from '../styles/BaseStyles'
import { ProjectCard, CommingCard, HistoryCard, StudioCard, BasicCard } from '../components/ui/Cards'
import { Tabs, TabLink } from '../components/ui/Tabs'
import { useState } from 'react'

function DesignGuide() {
   const [open, setOpen] = useState(false)

   const sampleData = [
      {
         studioName: '꿈빛파티세리',
         title: '[발렌타인데이] 사랑을 전하는 초코볼',
         intro: '소중한 사람에게 마음을 전할 수 있는 2월 14일 발렌타인데이! 당신의 진심을 전해보세요.',
         projectStatus: 'FUNDING_FAILED',
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
         <Box pb={4}>
            <Box sx={{ p: 2, m: 2, borderRadius: 2, background: '#ffeebd' }}>
               <Typography variant="h5">{component}</Typography>
               <Typography variant="body2" color="orenge">
                  <Typography component="span" variant="body2" fontWeight="700" color="brown">
                     props&nbsp;
                  </Typography>
                  {props}
               </Typography>
               <Typography>{children}</Typography>
            </Box>
            <Divider variant="middle" />
         </Box>
      )
   }

   // 탭링크 걸기 예시 구간
   // 1. 아래의 main, tab, tablink, stack2, modalBox 가 링크를 걸 섹션들

   const main = (
      <Memo component={'Main'} props={'children, spacing'}>
         페이지는 기본적으로 Main 컴포넌트로 감싸는 것을 기본으로 합니다. 이 페이지도 Main으로 랩핑한 상태입니다. 간격은 spaching으로 조절할 수 있지만, 어지간한 경우는 기본 설정으로 충분합니다. Main의 children은 margin이 안 먹힐 수 있으므로 여백을 추가로 주고 싶다면 padding을 사용해주세요.
         children을 가로로 나열하고 싶다면 아래의 Stack2를 사용하길 권장합니다.
      </Memo>
   )
   const tab = (
      <Memo component={'Tabs'} props={'tabItems=[{label:탭라벨이름, page:탭으로 이동할 컴포넌트}]'}>
         탭의 예시는 현재 페이지에서 확인할 수 있습니다. props의 형식대로 채우면 자동으로 탭과 라벨을 매칭합니다. 어떻게 사용하는지 감이 잘 안오면 DesignGuide.jsx에서 찾아보세요!
         <Typography color="green">⚠탭 내부에서 스크롤 이동하는 링크도 구현했습니다. 자세한 내용은 '제목 및 링크'에서 확인해주세요. </Typography>
      </Memo>
   )
   const tablink = (
      <Memo component={'TabLink'} props={'links=[{name:칩 라벨(링크), section:링크로 이동할 컴포넌트}]'}>
         탭 안에서 사용하는 스크롤 이동 링크입니다. '여러가지 틀' 탭 페이지에서 예시를 확인할 수 있습니다. 사용하려면 우선 탭에 들어갈 단락을 나눠서 탭링크로 전달하고, 그 탭링크를 탭페이지로 전달하는 방식으로 출력합니다. 사용법이 다소 복잡한 감이 있는데... 일단 만들어두긴 했습니다. 하나씩 적용하려면
         번거롭긴 하니까요. 컴포넌트도 제이슨/리스트 적용이 되므로 컴포넌트 파일을 만들어놓고 넣어도 무방합니다.(다들 아시겠지만 노파심에 적어둠!) DesignGuide.jsx에 주석으로 만드는 순서를 적어놨으니 참고 바랍니다.
      </Memo>
   )
   const stack2 = (
      <>
         <Stack2 spacing={2}>
            <Chip label={'Stack2 안에 들어있는 칩1'} />
            <Chip label={'Stack2 안에 들어있는 칩2'} />
         </Stack2>
         <Memo component={'Stack2'} props={'mui Stack props'}>
            기존 Mui의 Stack컴포넌트에서 기본 direction을 row로 변경했습니다. Stack에서 사용하던 props를 동일하게 사용할 수 있습니다. alignItems는 기본적으로 center입니다.
         </Memo>
      </>
   )
   const modalBox = (
      <>
         <ModalBox openBtn={<Button variant="outlined">기본 모달</Button>}>
            <Typography variant="h5">이것은 모달입니다.</Typography>
            <Typography>모달에 넣을 내용을 children으로 전달하세요.</Typography>
         </ModalBox>
         <ModalBox openBtn={<Button variant="outlined">닫기 버튼이 있는 모달</Button>} closeBtn>
            <Typography variant="h5">닫기 버튼이 있는 모달</Typography>
            <Typography>내용안에 이벤트 버튼도 포함할 수 있습니다.</Typography>
            <Button variant="outlined"> 등록 </Button>
         </ModalBox>
         <Memo component={'ModalBox'} props={'openBtn, closeBtn, children'}>
            children으로 내용이나 컴포넌트를 전달합니다. props로 closeBtn을 추가하면 닫기 버튼이 생기고, 버튼을 눌러서만 닫을 수 있습니다. 안에 버튼을 넣어서 submit할수도 있습니다만, 자동으로 모달창이 꺼지진 않기 때문에 사용하실거면 submit후 새로고침을 하도록 처리해주세요.
         </Memo>
      </>
   )
   // 2. 탭링크에 props 제이슨 형태로 전달하기

   const tablinks = [
      { name: '메인', section: main },
      { name: '탭', section: tab },
      { name: '탭링크', section: tablink },
      { name: '스택2', section: stack2 },
      { name: '모달박스', section: modalBox },
   ]

   const uiBox = <TabLink links={tablinks} />

   // 2. 탭링크에 props 제이슨 형태로 전달하기

   const uiCards = (
      <>
         <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
               <BasicCard>
                  <Typography>children 컴포넌트가 들어가는 자리</Typography>
                  <Typography>모든 텍스트는 반드시 Typography로 입력해주세요. </Typography>
               </BasicCard>
            </Grid2>
         </Grid2>
         <Memo component={'BasicCard'} props={'imgUrl, children, cardEf'}>
            모든 카드의 뼈대입니다. 카드는 Mui의 Grid2와 함께 사용합니다. Grid2 size는 md: 3, sm: 6, xs: 12 을 기본으로 합니다. 필요한 카드는 대부분 만들어뒀기 때문에 특별히 사용할 일은 없을 겁니다. imgUrl을 넣는 부분만 수정해서 사용하시면 됩니다. 반응형 작업은 모두 마친 상태입니다.
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
      </>
   )
   const uiText = (
      <>
         <SubTitle to="/desinguide">서브 타이틀</SubTitle>
         <Memo component={'SubTitle'} props={'children, to'}>
            홈에서 사용하는 제목입니다. props의 to를 사용해서 페이지 링크를 걸 수 있습니다.
         </Memo>
         <TextLink to="/desinguide">텍스트 링크</TextLink>
         <Memo component={'TextLink'} props={'mui Typography props'}>
            Mui의 Link와 라우터 돔의 Link를 합쳐둔 컴포넌트입니다. Mui Typography의 props와 혼용 가능합니다.
         </Memo>
         <Dot>텍스트 앞에 Dot을 추가합니다</Dot>
         <Dot both>양쪽에 넣을 수도 있습니다</Dot>
         <Dot float>
            <Typography variant="h5">dot을 부모 영역 밖으로 빼낼 수도 있습니다.</Typography>
         </Dot>
         <Memo component={'Dat'} props={'mui Typography props'}>
            Mui의 Link와 라우터 돔의 Link를 합쳐둔 컴포넌트입니다. Mui Typography의 props와 혼용 가능합니다.
         </Memo>
      </>
   )
   const uiButton = (
      <>
         <Button variant="contained">contained</Button>
         <Button variant="outlined">outlined</Button>
         <Button variant="yellow">yellow</Button>
         <Button variant="green">green</Button>
         <Memo component={'Button'} props={'mui Button props(add variant : yellow, green)'}>
            Mui 테마에서 커스텀을 마친 버튼들입니다. 따라서 그냥 Mui라이브러리에서 임포트해서 쓰면 됩니다. variant에 yellow와 green을 추가했으므로 값만 넣어서 색상을 바꾸시면 됩니다. 간혹 피그마에 노란바탕에 하얀 글씨로 써있는 버튼이 있는데, 그런 버튼도 여기의 옐로 버튼으로 통일해주세요.
         </Memo>
         <Stack2>
            <Chip label="grey" variant="grey" />
            <Chip label="green" variant="green" />
            <Chip label="yellow" variant="yellow" />
            <Chip label="outlined" variant="outlined" />
            <Chip label="filled" variant="filled" />
         </Stack2>

         <Memo component={'Chip'} props={'mui Button props(add variant : yellow, green, grey)'}>
            Mui 테마에서 커스텀을 마친 칩들입니다. 버튼과 마찬가지로 그냥 Mui라이브러리에서 임포트해서 쓰면 됩니다. variant에 yellow와 green 그리고 grey을 추가했으므로 값만 넣어서 색상을 바꾸시면 됩니다.
         </Memo>
      </>
   )
   const uiLoding = (
      <>
         <LoadingBox />
         <Memo component={'LoadingBox'} props={'heightValue'}>
            heightValue로 여백 높이를 조절할 수 있습니다.
         </Memo>
         <Button
            onClick={() => {
               setOpen(true)
            }}
         >
            버튼을 누르면 에러가 생깁니다.
         </Button>
         <ErrorBox error={'이부분에 에러메세지를 넣으면 출력합니다.'} open={open} setOpen={setOpen} />
         <Memo component={'ErrorBox'} props={'error, open, setOpen'}>
            필요한 페이지에 useState를 추가해서 open값과 setOpen함수를 준비해주세요. 에러 메세지창을 출력하는 때에 setOpen에 true값을 주면 에러 메세지창이 열립니다.
         </Memo>
      </>
   )
   const themeinfo = (
      <>
         <Typography color="yellow">yellow</Typography>
         <Typography color="green">green</Typography>
         <Typography color="orenge">orenge</Typography>
         <Memo component={'mui palette'} props={'color'}>
            저희가 자주 사용하는 노랑, 초록, 주황색도 테마로 추가해뒀습니다. color props 에 'yellow', 'green', 'orenge'를 입력하면 해당 컬러가 입혀집니다. 단, props가 아닌 sx에서 color를 사용할경우 기존 css컬러가 입혀지므로 주의 바랍니다.
         </Memo>
         <Typography variant="h1">h1</Typography>
         <Typography variant="h2">h2</Typography>
         <Typography variant="h3">h3</Typography>
         <Typography variant="h4">h4</Typography>
         <Typography variant="h5">h5</Typography>
         <Typography variant="h6">h6</Typography>
         <Typography variant="body1">body1</Typography>
         <Typography variant="body2">body2</Typography>
         <Typography variant="caption">caption</Typography>
         <Memo component={'Typography'} props={'mui Typography props'}>
            mui의 Typography 컴포넌트를 테마 커스텀해둔 상태입니다. 보통 소제목은 h4이하로 사용하면 무난합니다. 본문이 되는 텍스트는 반드시 body1(기본)이나 body2로 앉혀주세요. mui자체에 반응형 계산이 같이 되어있어서 모바일 화면으로 전환시 글씨가 미세하게 작아집니다.(이것도 아시겠지만 일단 노파심에
            적어둠!)
         </Memo>
      </>
   )

   // 3. 탭페이지에 제이슨 형태로 만든 탭링크 컴포넌트를 전달하기(끝!)

   const tabItems = [
      { label: '여러가지 틀', page: uiBox },
      { label: '카드', page: uiCards },
      { label: '제목 및 텍스트 링크', page: uiText },
      { label: '칩과 버튼', page: uiButton },
      { label: '로딩과 에러', page: uiLoding },
      { label: '컬러와 타이포그래피', page: themeinfo },
   ]

   return (
      <>
         <Main>
            <Tabs tabItems={tabItems} />
         </Main>
      </>
   )
}

export default DesignGuide
