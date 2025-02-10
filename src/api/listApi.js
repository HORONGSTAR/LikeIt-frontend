import likeitApi from './axiosApi'

// 프로젝트 목록 호출
export const showProjects = async (data) => {
   try {
<<<<<<< HEAD
      const { searchTerm = '', page, limit, type } = data
      const response = await likeitApi.get(`/list/${type}?limit=${limit}&page=${page}&searchTerm=${searchTerm}`)
=======
      const { page, limit, type } = data
      const response = await likeitApi.get(`/api/projects/list/${type}?limit=${limit}&page=${page}`)
>>>>>>> 48caed1fa6a72ececc8caba646384bda5a5ba2c3
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
