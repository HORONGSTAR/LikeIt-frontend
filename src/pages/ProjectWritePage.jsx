import { Main } from '../styles/BaseStyles'
import StudioNavber from '../components/shared/StudioNavber'
import ProjectFormTab from '../components/project/ProjectFormTab'

const ProjectWritePage = () => {
   return (
      <>
         <StudioNavber />
         <Main>
            <ProjectFormTab />
         </Main>
      </>
   )
}

export default ProjectWritePage
