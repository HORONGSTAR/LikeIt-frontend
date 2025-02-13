import likeitApi from './axiosApi'

// 관리자용 목록 호출
export const showAdminProjects = async () => {
   try {
      const response = await likeitApi.get(`/admin`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
