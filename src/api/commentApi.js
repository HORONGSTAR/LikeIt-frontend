import likeitApi from './axiosApi'

export const getComments = async (communityId, page = 1, limit = 10) => {
   try {
      const response = await likeitApi.get(`/comment/${communityId}`, {
         params: { page, limit },
      })
      return response.data
   } catch (error) {
      console.error('댓글 가져오기 실패:', error.message)
      throw error
   }
}

export const createComment = async (communityId, comment) => {
   try {
      const response = await likeitApi.post(`/comment/${communityId}`, { comment })
      return response.data
   } catch (error) {
      console.error('댓글 작성 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

export const updateComment = async (commentId, comment) => {
   try {
      const response = await likeitApi.put(`/comment/${commentId}`, { comment })
      return response
   } catch (error) {
      console.error('댓글 수정 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

export const deleteComment = async (commentId) => {
   try {
      const response = await likeitApi.delete(`/comment/${commentId}`)
      return response
   } catch (error) {
      console.error('댓글 삭제 실패:', error.response?.data?.message || error.message)
      throw error
   }
}
