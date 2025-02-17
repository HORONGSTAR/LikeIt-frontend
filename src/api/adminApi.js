import likeitApi from './axiosApi'

// 관리자용 목록 호출
export const showAdminProjects = async (data) => {
   try {
      const { page, searchTerm = '', selectProposal = '', selectCategory = '', selectBanner = '' } = data
      const response = await likeitApi.get(`/admin?page=${page}&searchTerm=${searchTerm}&selectProposal=${selectProposal}&selectCategory=${selectCategory}&selectBanner=${selectBanner}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 배너 등록
export const bannerReg = async (data) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await likeitApi.post(`/admin/banner/reg`, data, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 배너 해제
export const bannerDel = async (id) => {
   try {
      const response = await likeitApi.delete(`/admin/banner/del/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 승인 허가
export const proposalPass = async (id) => {
   try {
      const response = await likeitApi.patch(`/admin/proposal/pass/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 승인 거부
export const proposalDeny = async (data) => {
   try {
      const response = await likeitApi.patch(`/admin/proposal/deny`, data)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
