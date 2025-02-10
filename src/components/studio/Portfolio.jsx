import { Box, Stack } from '@mui/system'
import { Stack2 } from '../../styles/BaseStyles'
import { TabLink } from '../ui/Tabs'

function Portfolio({}) {
   const createInfo = <Stack2></Stack2>
   const newProject = <Stack2></Stack2>
   const timeLine = <Stack2></Stack2>
   const contect = <Stack2></Stack2>

   const links = [
      { name: '창작자 소개', section: createInfo },
      { name: '최근 프로젝트', section: newProject },
      { name: '타임라인', section: timeLine },
      { name: '문의처', section: contect },
   ]
   return <TabLink links={links} />
}

export default Portfolio
