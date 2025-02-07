import React, { useState } from 'react'
import { Box } from '@mui/material'
import CommunityDetail from './CommunityDetail'
import CommunityList from './CommunityList'
import dayjs from 'dayjs'

const now = dayjs()
console.log(now.format('YYYY년 MM월 DD일 HH시 mm분'))

// 샘플 게시글 데이터
const initialPosts = [
   {
      id: 1,
      author: '한리윤',
      profile: '/images/profile1.jpg',
      date: '2025년 1월 30일 15시 30분',
      title: '새 프로젝트에 많은 관심 부탁드립니다!',
      content: '가트발레단에서 새로운 프로젝트를 공개했습니다. 학생들과 함께 준비한 무대를 멋지게 성공할 수 있도록, 많은 지지와 응원 부탁드립니다!',
      image: './images/발레 1.jpg',
      comments: [
         { id: 1, author: '도레미', profile: './images/1.jpg', date: '2025년 1월 3일 5시 50분', content: '5번째 후원자에요! 응원합니다~' },
         { id: 2, author: '딩동댕', profile: './images/2.jpg', date: '2025년 1월 3일 5시 50분', content: '기대하고 있겠습니다!!' },
         { id: 3, author: 'VAN', profile: './images/3.jpg', date: '2025년 1월 3일 5시 50분', content: '항상 좋은 프로젝트 감사합니다.' },
      ],
   },
   {
      id: 2,
      author: '민아',
      profile: '/images/profile5.jpg',
      date: '2025년 1월 25일 14시 20분',
      title: '안녕하세요! 첫 게시글입니다 😊',
      content: '가트발레단의 활동을 공유하고 싶어요! 여러분과 소통할 수 있어서 기대됩니다!',
      comments: [],
   },
]

const CommunityTab = () => {
   const [posts] = useState(initialPosts)
   const [selectedPost, setSelectedPost] = useState(null) // 선택된 게시글 (상세보기)

   // 게시글 선택 시 상세보기 페이지로 이동
   const handlePostClick = (post) => {
      setSelectedPost(post)
   }

   // 목록으로 돌아가기
   const handleBackToList = () => {
      setSelectedPost(null)
   }

   return <Box sx={{ width: '100%', mt: 3 }}>{selectedPost ? <CommunityDetail post={selectedPost} onBack={handleBackToList} /> : <CommunityList posts={posts} onPostClick={handlePostClick} />}</Box>
}

export default CommunityTab
