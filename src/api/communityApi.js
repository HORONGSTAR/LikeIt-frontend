import likeitApi from './axiosApi'

// 특정 포스트 가져오기
export const getCommunityById = async (id) => {
   try {
      const response = await likeitApi.get(`/community/${id}`)
      return response.data
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 커뮤니티 글 목록 호출
export const showCommunities = async (data) => {
   try {
      const { page, limit } = data
      const response = await likeitApi.get(`/community/list?limit=${limit}&page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 커뮤니티 글 등록
export const createCommunity = async (communityData) => {
   try {
      const response = await likeitApi.post('/community', communityData)
      return response.data
   } catch (error) {
      console.error('커뮤니티 글 등록 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 커뮤니티 글 수정
export const updateCommunity = async (id, communityData) => {
   try {
      const response = await likeitApi.put(`/community/${id}`, communityData)
      return response.data
   } catch (error) {
      console.error('커뮤니티 글 수정 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 커뮤니티 글 삭제
export const deleteCommunity = async (id) => {
   try {
      await likeitApi.delete(`/community/${id}`)
      return { success: true, message: '커뮤니티 글이 삭제되었습니다.' }
   } catch (error) {
      console.error('커뮤니티 글 삭제 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 댓글 가져오기 (페이징)
export const getComments = async (communityId, page = 1, limit = 5) => {
   try {
      const response = await likeitApi.get(`/comment`, {
         params: { communityId, page, limit },
      })
      return response.data
   } catch (error) {
      console.error('댓글 가져오기 실패:', error.message)
      throw error
   }
}

// 댓글 작성
export const createCommentApi = async (communityId, comment) => {
   try {
      if (!communityId || !comment) {
         throw new Error('communityId와 comment는 필수입니다.')
      }

      console.log('보낼 데이터:', { communityId, comment })
      const response = await likeitApi.post(`/comment`, { communityId, comment })
      return response.data.comment // 댓글 데이터만 반환
   } catch (error) {
      console.error('댓글 작성 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 댓글 수정
export const updateComment = async (commentId, comment) => {
   try {
      const response = await likeitApi.put(`/comment/${commentId}`, { comment })
      return response
   } catch (error) {
      console.error('댓글 수정 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 댓글 삭제
export const deleteComment = async (commentId) => {
   try {
      const response = await likeitApi.delete(`/comment/${commentId}`)
      return response
   } catch (error) {
      console.error('댓글 삭제 실패:', error.response?.data?.message || error.message)
      throw error
   }
}
