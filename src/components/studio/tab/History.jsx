import { Grid2 } from '@mui/material'
import { HistoryCard } from '../../ui/Cards'

function History({ items }) {
   return (
      <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
         {items &&
            items.projects.map((project) => (
               <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <HistoryCard project={project} studioName={items.studioName} />
               </Grid2>
            ))}
      </Grid2>
   )
}

export default History
