import likeitApi from './axiosApi'

export const getReward = async (projectId) => {
   try {
      const response = await likeitApi.get(`/project/reward/${projectId}`)
      return response
   } catch (error) {
      console.error(`특정 프로젝트 선물 조회 오류: ${error.message}`)
      throw error
   }
}

// 선물 구성품 생성
export const createProduct = async (projectId, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post(`/project/reward/product/${projectId}`, productData, config)

      return response
   } catch (error) {
      console.error(`선물 구성품 생성 오류: ${error.message}`)
      throw error
   }
}

// 선물 구성품 수정
export const updateProduct = async (productId, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.put(`/project/reward/product/${productId}`, productData, config)
      return response
   } catch (error) {
      console.error(`선물 구성품 수정 오류: ${error.message}`)
      throw error
   }
}

// 선물 구성품 삭제
export const deleteProduct = async (productId) => {
   try {
      const response = await likeitApi.delete(`/project/reward/product/${productId}`)
      return response
   } catch (error) {
      console.error(`선물 구성품 삭제 오류: ${error.message}`)
      throw error
   }
}

// 후원 선물 생성
export const createReward = async (projectId, rewardData) => {
   try {
      const response = await likeitApi.post(`/project/reward/${projectId}`, rewardData)

      return response
   } catch (error) {
      console.error(`후원 선물 생성 오류: ${error.message}`)
      throw error
   }
}

// 후원 선물 수정
export const updateReward = async (rewardId, rewardData) => {
   try {
      const response = await likeitApi.put(`/project/reward/${rewardId}`, rewardData)
      return response
   } catch (error) {
      console.error(`후원 선물 수정 오류: ${error.message}`)
      throw error
   }
}

// 후원 선물 삭제
export const deleteReward = async (rewardId) => {
   try {
      const response = await likeitApi.delete(`/project/reward/${rewardId}`)
      return response
   } catch (error) {
      console.error(`후원 선물 삭제 오류: ${error.message}`)
      throw error
   }
}
