import likeitApi from './axiosApi'

// 배너 프로젝트 호출
export const showBanner = async () => {
   try {
      const response = await likeitApi.get(`/main/banner`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 프로젝트 목록 호출
export const showProjects = async (type) => {
   try {
      const response = await likeitApi.get(`/main/list/${type}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
