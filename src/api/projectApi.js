import likeitApi from './axiosApi'

// 특정 스튜디오의 프로젝트 조회
export const getProjectsByStudio = async ({ studioId, page, limit, search = '' }) => {
   try {
      const response = await likeitApi.get(`/project/studio/${studioId}`, {
         params: { page, limit, search },
      })
      return response
   } catch (error) {
      console.error(`특정 스튜디오 프로젝트 조회 오류: ${error.message}`)
      throw error
   }
}

// 프로젝트 생성
export const createProject = async (projectData) => {
   try {
      const response = await likeitApi.post('/project/create', projectData)
      return response
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
      return response
   } catch (error) {
      console.error(`프로젝트 수정 오류: ${error.message}`)
      throw error
   }
}

// 특정 프로젝트 조회
export const getProjectById = async (projectId) => {
   try {
      const response = await likeitApi.get(`/project/${projectId}`)
      return response
   } catch (error) {
      console.error(`프로젝트 조회 오류: ${error.message}`)
      throw error
   }
}
