import likeitApi from './axiosApi'

// 프로젝트 목록 호출
export const showProjects = async (type) => {
   try {
      const response = await likeitApi.get(`/list/${type}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
