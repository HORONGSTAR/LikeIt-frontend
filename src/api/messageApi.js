import likeitApi from './axiosApi'

// 메시지 목록 호출
export const fetchMessages = async (data) => {
   try {
      const { page, limit } = data
      const response = await likeitApi.get(`/message?limit=${limit}&page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
