import likeitApi from './axiosApi'

// 프로젝트 목록 호출
export const showProjects = async (data) => {
   try {
      const { page, limit, type } = data
      const response = await likeitApi.get(`/api/projects/list/${type}?limit=${limit}&page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
