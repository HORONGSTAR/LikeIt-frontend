import React from 'react'
import { Avatar, Grid, Typography, Box } from '@mui/material'

const CreatorList = ({ creators }) => {
   return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
         <Grid container spacing={3}>
            {creators.map((creator, index) => (
               <Grid item key={index}>
                  <Avatar src={creator.img} alt={creator.name} sx={{ width: 120, height: 120, margin: 'auto' }} />
                  <Typography variant="body1" mt={1}>
                     {creator.name}
                  </Typography>
               </Grid>
            ))}
         </Grid>
      </Box>
   )
}

export default CreatorList
