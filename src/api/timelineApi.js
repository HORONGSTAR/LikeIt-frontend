import likeitApi from './axiosApi'

//  타임라인 글 등록
export const createTimeline = async (timelineData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post('/timeline/create', timelineData, config)
      return response
   } catch (error) {
      console.error(`타임라인 글 등록 실패: ${error.response?.data?.message || error.message}`)
      throw error
   }
}

// 타임라인 글 수정
export const updateTimeline = async (id, timelineData) => {
   try {
      const response = await likeitApi.put(`/timeline/${id}`, timelineData)
      return response
   } catch (error) {
      console.error('타임라인 글 수정 실패:', error.response?.data?.message || error.message)
      throw error
   }
}

// 타임라인 글 삭제
export const deleteTimeline = async (id) => {
   try {
      await likeitApi.delete(`/timeline/${id}`)
      return { success: true, message: '타임라인 글이 삭제되었습니다.' }
   } catch (error) {
      console.error('타임라인 글 삭제 실패:', error.response?.data?.message || error.message)
      throw error
   }
}
