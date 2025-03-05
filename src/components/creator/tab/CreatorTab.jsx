import FundingTimeline from '../../funding/FundingTimeline'
import { Tabs } from '../../ui/Tabs'
import FundHistory from './FundHistory'
import Support from './Support'
// import Timeline from './Timeline'

function CreatorTab() {
   const tabItems = [
      { label: '후원 관리', page: <Support /> },
      { label: '진행 소식', page: <FundingTimeline /> },
      { label: '모금액 내역', page: <FundHistory /> },
   ]
   return (
      <>
         <Tabs
            tabItems={tabItems}
            sx={{
               '& .MuiTabs-indicator': {
                  backgroundColor: '#D97400',
               },
               '& .MuiTab-root': {
                  color: '#666666',
               },
               '& .Mui-selected': {
                  color: '#D97400 !important',
                  fontWeight: 'bold',
               },
            }}
         />
      </>
   )
}

export default CreatorTab
