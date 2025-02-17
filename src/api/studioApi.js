import likeitApi from './axiosApi'

// 스튜디오 조회
export const getStudio = async () => {
   try {
      const response = await likeitApi.get('/studio')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 스튜디오 생성
export const createStudio = async (studioData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post('/studio', studioData, config)
      return response.data
   } catch (error) {
      console.error(`스튜디오 생성 오류: ${error.message}`)
      throw error
   }
}

// 스튜디오 수정
export const updateStudio = async (studioId, studioData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.put(`/studio/${studioId}`, studioData, config)
      return response.data
   } catch (error) {
      console.error(`스튜디오 수정 오류: ${error.message}`)
      throw error
   }
}

// 특정 스튜디오 조회
export const getStudioById = async (studioId) => {
   try {
      const response = await likeitApi.get(`/studio/${studioId}`)
      return response
   } catch (error) {
      console.error(`스튜디오 조회 오류: ${error.message}`)
      throw error
   }
}
