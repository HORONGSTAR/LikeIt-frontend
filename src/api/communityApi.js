import likeitApi from './axiosApi'

export const getCommunityById = async (id) => {
   try {
      const response = await likeitApi.get(`/community/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

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

export const createCommunity = async (communityData) => {
   try {
      const response = await likeitApi.post('/community', communityData)
      return response.data
   } catch (error) {
      console.error('커뮤니티 글 등록 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

export const updateCommunity = async (id, communityData) => {
   try {
      const response = await likeitApi.put(`/community/${id}`, communityData)
      return response.data
   } catch (error) {
      console.error('커뮤니티 글 수정 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

export const deleteCommunity = async (id) => {
   try {
      await likeitApi.delete(`/community/${id}`)
      return { success: true, message: '커뮤니티 글이 삭제되었습니다.' }
   } catch (error) {
      console.error('커뮤니티 글 삭제 실패:', error.response?.data?.message || error.message)
      throw error
   }
}
