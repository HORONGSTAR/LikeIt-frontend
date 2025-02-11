import likeitApi from './axiosApi'

// 배너 프로젝트 호출
export const showBanner = async () => {
   try {
      const response = await likeitApi.get(`/banner`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

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
