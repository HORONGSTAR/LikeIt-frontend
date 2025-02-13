import likeitApi from './axiosApi'

export const getStudio = async () => {
   try {
      const response = await likeitApi.get('/studio')
      return response.data
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const createStudio = async (studioData) => {
   try {
      const response = await likeitApi.post('/studio', studioData)
      return response.data
   } catch (error) {
      console.error(`스튜디오 생성 오류: ${error.message}`)
      throw error
   }
}
