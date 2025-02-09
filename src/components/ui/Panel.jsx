import { Box, Stack } from '@mui/material'

export const Panel = ({ image, children }) => {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
         }}
      >
         <Box
            sx={{
               background: '#fff',
               boxSizing: 'border-box',
               boxShadow: '-4px 0px 4px rgba(0,0,0,0.25)',
               width: { sm: '45%', xs: '100%' },
               minWidth: { sm: 400, xs: 'auto' },
               ml: { sm: 'auto', xs: 0 },
               height: '100vh',
               p: 2,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Stack spacing={3} alignItems="center">
               <img src="images/logo.svg" alt="Like It!" width={200} />
               {children}
            </Stack>
         </Box>
      </Box>
   )
}
