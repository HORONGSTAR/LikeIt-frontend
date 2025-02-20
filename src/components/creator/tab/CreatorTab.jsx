import { Tabs } from '../../ui/Tabs'
// import { useSelector } from 'react-redux'
import FundHistory from './FundHistory'
import Support from './Support'
import News from './News'

function CreatorTab() {
   //    const { studio, projects } = useSelector((state) => state.studio)

   //    const data = {
   //       potrfolio: {
   //          creators: studio.StudioCreators.map((creator) => creator.Creator),
   //          new: projects[0],
   //          projects: projects.filter((project) => project.projectStatus !== 'FUNDING_FAILED'),
   //          contects: { name: studio.name, sns: studio.StudioAccounts },
   //       },
   //       history: {
   //          projects: projects.filter((project) => project.projectStatus !== 'WAITING_FUNDING'),
   //          studioName: studio.name,
   //       },
   //    }

   const tabItems = [
      { label: '후원 관리', page: <Support /> },
      { label: '진행 소식', page: <News /> },
      { label: '모금액 내역', page: <FundHistory /> },
   ]
   return (
      <>
         <Tabs tabItems={tabItems} />
      </>
   )
}

export default CreatorTab
