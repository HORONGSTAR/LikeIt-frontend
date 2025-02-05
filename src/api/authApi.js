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
