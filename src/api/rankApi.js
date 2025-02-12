import likeitApi from './axiosApi'

// 후원자 랭킹 호출
export const showRanks = async () => {
   try {
      const response = await likeitApi.get(`/rank`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인 유저 통계 호출
export const showMyRank = async (id) => {
   try {
      const response = await likeitApi.get(`/rank/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
