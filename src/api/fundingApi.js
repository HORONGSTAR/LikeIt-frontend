import likeitApi from './axiosApi'

// 후원자 랭킹 호출
export const getFunding = async (id) => {
   try {
      const response = await likeitApi.get(`/funding/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
