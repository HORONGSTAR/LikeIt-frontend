import { Main } from '../styles/BaseStyles'
import StudioNavber from '../components/shared/StudioNavber'
import StudioLayout from '../components/studio/StudioLayout'

const StudioPage = () => {
   return (
      <>
         <StudioNavber />
         <Main>
            <StudioLayout />
         </Main>
      </>
   )
}

export default StudioPage
