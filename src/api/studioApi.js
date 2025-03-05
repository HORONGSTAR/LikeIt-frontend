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
      return response
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
      return response
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

export const runSpace = async () => {
   try {
      const response = await likeitApi.post('/studio/space')
      return response
   } catch (error) {
      console.error(`스페이스 요청 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 추천
export const studioFollow = async (id) => {
   try {
      const response = await likeitApi.post(`/studio/follow/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 추천 취소
export const studioUnFollow = async (id) => {
   try {
      const response = await likeitApi.delete(`/studio/unfollow/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
