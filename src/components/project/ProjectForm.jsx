import { Box, InputBase, TextField, Grid2, Typography } from '@mui/material'
import { Dot } from '../../styles/BaseStyles'

function ProjectForm() {
   const formData = {}

   return (
      <Grid2 container columnSpacing={2} rowSpacing={2}>
         <Grid2 size={{ md: 3, sx: 12 }}>
            <Dot>
               <Typography variant="h5" lineHeight={2.2}>
                  {}
               </Typography>
            </Dot>
         </Grid2>
         <Grid2 size={{ md: 9, sx: 12 }}>
            <TextField />
         </Grid2>
      </Grid2>
   )
}

export default ProjectForm
