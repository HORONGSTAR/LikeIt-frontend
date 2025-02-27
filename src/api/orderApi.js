import likeitApi from './axiosApi'

// 특정 프로젝트의 후원자 주문 목록 조회
export const fetchOrdersByProject = async (projectId) => {
   try {
      const response = await likeitApi.get(`/order/project/${projectId}`)
      return response.data
   } catch (error) {
      console.error('주문 목록 조회 오류:', error)
      throw error
   }
}

// 특정 주문 상세 조회
export const fetchOrderById = async (orderId) => {
   try {
      const response = await likeitApi.get(`/order/${orderId}`)
      return response.data.order
   } catch (error) {
      console.error('주문 상세 조회 오류:', error)
      throw error
   }
}

// 주문 생성
export const createOrder = async (orderData) => {
   try {
      const response = await likeitApi.post('/order/', orderData)
      return response.data.order
   } catch (error) {
      console.error('주문 생성 오류:', error)
      throw error
   }
}

// 주문 상태 업데이트
export const updateOrderStatus = async (orderId, updateData) => {
   try {
      const response = await likeitApi.put(`/order/${orderId}`, updateData)
      return response.data.order
   } catch (error) {
      console.error('주문 상태 업데이트 오류:', error)
      throw error
   }
}

// 주문 삭제
export const deleteOrder = async (orderId) => {
   try {
      await likeitApi.delete(`order/${orderId}`)
      return orderId
   } catch (error) {
      console.error('주문 삭제 오류:', error)
      throw error
   }
}

// 운송장 파일 업로드
export const uploadTrackingNumbers = async (formData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post('/order/upload-tracking', formData, config)
      return response
   } catch (error) {
      console.error('운송장 번호 업로드 오류:', error)
      throw error
   }
}
