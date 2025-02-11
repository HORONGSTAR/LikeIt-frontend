import likeitApi from './axiosApi'

// 프로젝트 목록 호출
export const showProjects = async (data) => {
   try {
      const { searchTerm = '', categoryId = '', page, limit, type } = data
      const response = await likeitApi.get(`/list/${type}?limit=${limit}&page=${page}&searchTerm=${searchTerm}&categoryId=${categoryId}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
