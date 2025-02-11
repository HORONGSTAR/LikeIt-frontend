import likeitApi from './axiosApi'

export const getStudio = async () => {
   try {
      const response = await likeitApi.get('/studio')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
