import React from 'react'
import { Box } from '@mui/material'
import CommonCard from '../ui/CommonCard'

const ProjectTab = () => {
   return (
      <Box
         sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            justifyContent: 'center',
         }}
      >
         <CommonCard image="./images/발레 3.jpg" studio="BY.가트발레단" title="한국대 발레단 가트발레단 ‘호두까기인형’" description="가트발레단을 소개합니다!" chipLabel="펀딩 진행 중" chipColor="green" percentage={98} />
         <CommonCard image="./images/발레 3.jpg" studio="BY.가트발레단" title="가트발레단 & 문화 한마당" description="한국대 가트발레단과 문화 한마당의 콜라보!" chipLabel="펀딩 성공" chipColor="orange" percentage={1125} status="완료" />
         <CommonCard image="./images/발레4.jpg" studio="BY.가트발레단" title="가트발레단 & 문화 한마당" description="한국대 가트발레단과 문화 한마당의 콜라보!" chipLabel="펀딩 성공" chipColor="orange" percentage={1125} status="완료" />
         <CommonCard image="./images/발레 2.jpg" studio="BY.가트발레단" title="가트발레단 & 문화 한마당" description="한국대 가트발레단과 문화 한마당의 콜라보!" chipLabel="펀딩 성공" chipColor="orange" percentage={1125} status="완료" />
         <CommonCard image="./images/발레리나.jpg" studio="BY.가트발레단" title="가트발레단 & 문화 한마당" description="한국대 가트발레단과 문화 한마당의 콜라보!" chipLabel="펀딩 실패" chipColor="orange" percentage={75} status="실패" />
      </Box>
   )
}

export default ProjectTab
