import { Grid2, Typography, Divider } from '@mui/material'
import { Dot } from '../../styles/BaseStyles'

export const FormGrid = ({ formItems }) => {
   return (
      <>
         {formItems &&
            formItems.map((item) => (
               <Grid2 key={item.name} container rowSpacing={1} py={1}>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                     <Dot>
                        <Typography variant="h5" lineHeight={2.2}>
                           {item.name}
                        </Typography>
                     </Dot>
                  </Grid2>
                  <Grid2 size={{ md: 9, sm: 12 }} pl={1.5}>
                     {item.input}
                  </Grid2>
               </Grid2>
            ))}
         <Divider />
      </>
   )
}
