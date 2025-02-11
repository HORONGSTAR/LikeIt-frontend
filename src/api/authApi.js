import likeItApi from './axiosApi'

//회원가입
export const registerUser = async (userData) => {
   try {
      const response = await likeItApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error //request 할떄 오류 발생시 에러르 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await likeItApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error
   }
}

//구글 로그인 혹은 구글 회원가입
export const googleRegisterUser = async (credential) => {
   try {
      const response = await likeItApi.post('/auth/googlejoin', credential)
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await likeItApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await likeItApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
