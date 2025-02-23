import likeitApi from './axiosApi'

// 선물 구성품 생성
export const createProduct = async (projectId, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post(`/project/item/product/${projectId}`, productData, config)

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
      const response = await likeitApi.put(`/project/item/product/${productId}`, productData, config)
      return response
   } catch (error) {
      console.error(`선물 구성품 수정 오류: ${error.message}`)
      throw error
   }
}

// 선물 구성품 삭제
export const deleteProduct = async (productId) => {
   try {
      const response = await likeitApi.delete(`/project/item/product/${productId}`)
      return response
   } catch (error) {
      console.error(`선물 구성품 삭제 오류: ${error.message}`)
      throw error
   }
}
