import likeitApi from './axiosApi'

// 창작자 목록 조회
export const getCreators = async (studioId) => {
   try {
      const response = await likeitApi.get(`/creator/${studioId}`)
      return response.data
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 창작자 권한 업데이트
export const updateCreatorRole = async (id, data) => {
   try {
      const response = await likeitApi.put(`/creator/${id}`, data)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 창작자 추가
export const addCreator = async ({ name, role, studioId }) => {
   try {
      const response = await likeitApi.post('/creator', { name, role, studioId })
      return response.data
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 창작자 삭제
export const deleteCreator = async (id) => {
   return await likeitApi.delete(`/creator/${id}`)
}
