import likeItApi from './axiosApi'

//내 프로필 가져오기
export const getProfile = async () => {
   try {
      const response = await likeItApi.get(`/page/profile`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const updateProfile = async (profileData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }

      const response = await likeItApi.put('/page/profile', profileData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
