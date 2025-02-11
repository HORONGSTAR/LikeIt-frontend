import { Box, Stack } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import { Tabs } from '../ui/Tabs'
import Portfolio from './Portfolio'
import History from './History'
import Community from './Community'
import { useSelector } from 'react-redux'

function StudioTab() {
   const { studio, projects } = useSelector((state) => state.studio)
   console.log(studio)

   const data = {
      potrfolio: {
         creators: studio.StudioCreators.map((creator) => creator.Creator),
         new: projects[0],
         projects: projects.filter((project) => project.projectStatus !== 'FUNDING_FAILED'),
         contects: studio.StudioAccounts,
      },
      history: {
         projects: projects.filter((project) => project.projectStatus !== 'WAITING_FUNDING'),
         studioName: studio.name,
      },
   }

   const tabItems = [
      { label: '스튜디오', page: <Portfolio items={data.potrfolio} /> },
      { label: '프로젝트', page: <History items={data.history} /> },
      { label: '커뮤니티', page: <Community /> },
   ]
   return (
      <>
         <Tabs tabItems={tabItems} />
      </>
   )
}

export default StudioTab
