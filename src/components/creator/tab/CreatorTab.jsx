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
         <Tabs tabItems={tabItems} />
      </>
   )
}

export default CreatorTab
