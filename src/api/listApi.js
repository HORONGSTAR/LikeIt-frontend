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

// 팔로우 스튜디오 호출
export const showFollowStudios = async (data) => {
   try {
      const { page, id } = data
      const response = await likeitApi.get(`/list/follow/${id}?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 공개 예정 프로젝트 알림신청
export const noticeReg = async (id) => {
   try {
      const response = await likeitApi.post(`/list/notice/reg/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 공개 예정 프로젝트 알림해제
export const noticeDel = async (id) => {
   try {
      const response = await likeitApi.delete(`/list/notice/del/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
