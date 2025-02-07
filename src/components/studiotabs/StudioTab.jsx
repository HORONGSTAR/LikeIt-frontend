import React from 'react'
import { Box, Typography, Stack, IconButton } from '@mui/material'
import CreatorList from '../ui/CreatorList'
import StatusChip from '../ui/StatusChip'
import ProjectCard from '../ui/ProjectCard'
import TimelineList from '../ui/TimelineList'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'

const creators = [
   { name: '대표 한리윤', img: '/images/발레4.jpg' },
   { name: '민아', img: '/images/발레4.jpg' },
   { name: '정소희', img: '/images/발레4.jpg' },
   { name: '용우', img: '/images/발레4.jpg' },
]

const events = [
   {
      date: '2021.4.12',
      title: '우리가 사랑하는 클래식, 눈의 여왕',
      description: '한국대 가트발레단의 첫번째 공연. 함께한 학생들의 무대를 확인해 주세요!',
      percentage: '102%',
      image: '/images/발레 2.jpg',
   },
   {
      date: '2022.6.27',
      title: '한국대 가트발레단 & 문화 한마당 : 특별 기획 백조의 호수',
      description: '한국대 가트발레단과 문화 한마당이 콜라보! ‘백조의 호수’를 젊은 시선에서 풀어냅니다.',
      percentage: '1125%',
      image: '/images/발레 2.jpg',
   },
   {
      date: '2023.12.30',
      title: '가트발레단 & 한빛어린이재단 : 창작 발레극 별빛과 무지개',
      description: '2023년 어린이 문화 특별 대상 ‘별빛과 무지개’를 가트발레단이 공연으로 만나보세요!',
      percentage: '304%',
      image: '/images/발레 3.jpg',
   },
]

const StudioTab = () => {
   return (
      <Box>
         <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
            · 창작자 소개
         </Typography>
         <CreatorList creators={creators} />

         <Box sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  · 최근 프로젝트
               </Typography>
               <StatusChip label="펀딩 진행 중" bgColor="#DBE7D9" textColor="#45843C" />
            </Box>
         </Box>
         <ProjectCard
            title="한국대 발레단 가트발레단 ‘호두까기인형’"
            description="안녕하세요, 저희는 한국대학교 가트발레단입니다. 오랜 시간 동안 다양한 작품을 통해 관객 여러분과 소통해 온 저희 발레단이 ‘호두까기 인형’ 공연을 준비하게 되었습니다."
            image="/images/발레 2.jpg"
            buttonText="프로젝트 펀딩 페이지로 이동"
            buttonLink="/funding"
         />

         <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
               · 타임라인
            </Typography>
            <TimelineList events={events} />
         </Box>

         <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
               · 문의처
            </Typography>

            <Box sx={{ display: 'flex', border: '1px solid #ccc', borderRadius: '10px', mt: 2 }}>
               {/* 버튼 그룹 */}
               <Stack direction="row" alignItems="center" sx={{ m: 1, color: '#666' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 2 }}>
                     스튜디오
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                     가트발레단
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                     |
                  </Typography>
               </Stack>

               {/* 이메일 */}
               <Stack direction="row" alignItems="center" sx={{ m: 1, color: '#666' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                     이메일
                  </Typography>
                  <IconButton>
                     <EmailIcon sx={{ color: '#555' }} />
                  </IconButton>
                  <Typography variant="body1">gatoart@naver.com</Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                     |
                  </Typography>
               </Stack>

               {/* SNS */}
               <Stack direction="row" alignItems="center" sx={{ m: 1, color: '#666' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                     SNS
                  </Typography>
                  <IconButton>
                     <InstagramIcon sx={{ color: '#E4405F' }} />
                  </IconButton>
                  <Typography variant="body1">인스타그램</Typography>
               </Stack>
            </Box>
         </Box>
      </Box>
   )
}

export default StudioTab
