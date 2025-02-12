import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CommunityList from '../../components/community/CommunityList'
import CommunityDetail from '../../components/community/CommunityDetail'

const CommunityTab = () => {
   const navigate = useNavigate()
   const userRole = 'creator' // 예제에서는 하드코딩

   // 📌 선택된 게시글 상태 추가
   const [selectedPost, setSelectedPost] = useState(null)

   // 📌 예제 데이터 추가
   const [posts, setPosts] = useState([
      {
         id: 1,
         title: '새로운 프로젝트를 소개합니다!',
         author: '김창작',
         date: '2025-02-07',
         profile: '/images/profile1.jpg',
         content: '이 프로젝트는 많은 분들의 관심을 받고 있습니다!',
         comments: [],
      },
      {
         id: 2,
         title: '발레 공연 준비 과정 공유',
         author: '박예술',
         date: '2025-02-06',
         profile: '/images/profile2.jpg',
         content: '공연 준비 과정에서 있었던 일들을 공유합니다.',
         comments: [],
      },
   ])

   // 📌 게시글 클릭 시 상세 보기
   const handlePostClick = (post) => {
      setSelectedPost(post)
   }

   // 📌 목록으로 돌아가기
   const handleBackToList = () => {
      setSelectedPost(null)
   }

   // 📌 게시글 수정 시 업데이트
   const handleUpdatePost = (updatedPost) => {
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
      setSelectedPost(updatedPost) // 수정된 내용 반영
   }

   return (
      <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 5 }}>
         {/* 📌 상세 페이지와 목록 페이지 분기 처리 */}
         {selectedPost ? (
            <CommunityDetail post={selectedPost} onBack={handleBackToList} onUpdate={handleUpdatePost} />
         ) : (
            <>
               <CommunityList posts={posts} onPostClick={handlePostClick} />

               {/* 글쓰기 버튼 */}
               {userRole === 'creator' && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                     <Button variant="contained" color="primary" onClick={() => navigate('/studio/commu/write')}>
                        글쓰기
                     </Button>
                  </Box>
               )}
            </>
         )}
      </Box>
   )
}

export default CommunityTab
