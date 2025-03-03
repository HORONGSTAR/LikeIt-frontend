import likeitApi from './axiosApi'

// 특정 프로젝트 호출
export const getFunding = async (id) => {
   try {
      const response = await likeitApi.get(`/funding/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
// 타임라인 게시물 목록 호출
export const getTimelines = async (data) => {
   try {
      const { page, limit, id } = data
      const response = await likeitApi.get(`/funding/timeline/${id}?page=${page}&limit=${limit}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
// 특정 타임라인 게시물 호출
export const getTimeline = async (id) => {
   try {
      const response = await likeitApi.get(`/funding/timeline/detail/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
// 타임라인 댓글 작성
export const timelineCommentReg = async (data) => {
   try {
      const response = await likeitApi.post(`/funding/timeline/comment/reg`, data)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
// 타임라인 댓글 삭제
export const timelineCommentDel = async (id) => {
   try {
      const response = await likeitApi.delete(`/funding/timeline/comment/del/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 목록 호출
export const getReviews = async (data) => {
   try {
      const { page, limit, id } = data
      const response = await likeitApi.get(`/funding/reviews/${id}?page=${page}&limit=${limit}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 추천
export const reviewRecommendReg = async (id) => {
   try {
      const response = await likeitApi.post(`/funding/review/recommend/reg/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 추천 취소
export const reviewRecommendDel = async (id) => {
   try {
      const response = await likeitApi.delete(`/funding/review/recommend/del/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 등록
export const reviewReg = async (data) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await likeitApi.post(`/funding/review/reg`, data, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 리뷰 삭제
export const reviewDel = async (id) => {
   try {
      const response = await likeitApi.delete(`/funding/review/del/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 펀딩 후원
export const orderReg = async (data) => {
   try {
      const response = await likeitApi.post(`/funding/order`, data)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
