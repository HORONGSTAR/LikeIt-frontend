import { Box, Stack } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import { Tabs } from '../ui/Tabs'
import Portfolio from './Portfolio'
import History from './History'
import Community from './Community'
import { useSelector } from 'react-redux'

function StudioTab() {
   const { studio, projects } = useSelector((state) => state.studio)

   const tabItems = [
      { label: '스튜디오', page: <Portfolio /> },
      { label: '프로젝트', page: <History /> },
      { label: '커뮤니티', page: <Community /> },
   ]
   return <></>
}

export default StudioTab
