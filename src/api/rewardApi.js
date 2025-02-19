import likeitApi from './axiosApi'

// 선물 구성품 생성
export const createRewardProduct = async (projectId, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post(`/reward/product/${projectId}`, productData, config)

      return response
   } catch (error) {
      console.error(`선물 구성품 생성 오류: ${error.message}`)
      throw error
   }
}

// 선물 구성품 수정
export const updateRewardProduct = async (productId, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.put(`/reward/product/${productId}`, productData, config)
      return response
   } catch (error) {
      console.error(`선물 구성품 수정 오류: ${error.message}`)
      throw error
   }
}
