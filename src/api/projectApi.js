import likeitApi from './axiosApi'

// 프로젝트 생성
export const createProject = async (projectData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.post('/project/create', projectData, config)
      return response.data
   } catch (error) {
      console.error(`프로젝트 생성 오류: ${error.message}`)
      throw error
   }
}

// 프로젝트 수정
export const updateProject = async (projectId, projectData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await likeitApi.put(`/project/edit/${projectId}`, projectData, config)
      return response.data
   } catch (error) {
      console.error(`프로젝트 수정 오류: ${error.message}`)
      throw error
   }
}

// 특정 프로젝트 조회
export const getProjectById = async (projectId) => {
   try {
      const response = await likeitApi.get(`/studio/${projectId}`)
      return response
   } catch (error) {
      console.error(`프로젝트 조회 오류: ${error.message}`)
      throw error
   }
}
