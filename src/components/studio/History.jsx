import { Box, Stack, Grid2 } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import { HistoryCard } from '../ui/Cards'

function History({ projects }) {
   return (
      <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
         {projects &&
            projects
               .filter((project) => project.projectStatus !== 'WAITING_FUNDING')
               .map((project) => (
                  <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                     <HistoryCard project={project} />
                  </Grid2>
               ))}
      </Grid2>
   )
}

export default History
