import { Grid2, Typography, Divider } from '@mui/material'
import { Dot } from '../../styles/BaseStyles'

export const FormGrid = ({ formItems }) => {
   return (
      <>
         {formItems &&
            formItems.map((item) => (
               <Grid2 key={item.name} container rowSpacing={1} pb={5}>
                  <Grid2 size={{ md: 3, sm: 12, xs: 12 }}>
                     <Dot>
                        <Typography variant="h6" lineHeight={2.2}>
                           {item.name}
                        </Typography>
                     </Dot>
                  </Grid2>
                  <Grid2 size={{ md: 9, sm: 12, xs: 12 }}>{item.input}</Grid2>
               </Grid2>
            ))}
         <Divider />
      </>
   )
}
