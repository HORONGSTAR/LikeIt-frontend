import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#222',
         contrastText: '#fff',
      },
      secondary: {
         main: '#FFCC4D',
         contrastText: '#D97400',
      },

      error: {
         main: '#C84137',
         contrastText: '#fff',
      },

      info: {
         main: '#DBE7D9',
         contrastText: '#45843C',
      },

      warning: {
         main: '#D97400',
         contrastText: '#fff',
      },
      success: {
         main: '#4ACBCF',
         contrastText: '#fff',
      },
   },
   typography: {
      h1: { fontSize: 26, fontWeight: 600 },
      h2: { fontSize: 24, fontWeight: 600 },
      h3: { fontSize: 22, fontWeight: 600 },
      h4: { fontSize: 20, fontWeight: 600 },
      h5: { fontSize: 16, fontWeight: 600 },
      h6: { fontSize: 14, fontWeight: 600 },
      body1: { fontSize: 14, fontWeight: 500 },
      body2: { fontSize: 12, fontWeight: 500 },
      fontFamily: "'Pretendard', 'sans-serif'",
   },
   components: {
      MuiAppBar: {
         styleOverrides: {
            root: {
               '--AppBar-background': '#fff',
               '--AppBar-color': '#222',
               boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
            },
         },
      },
      MuiChip: {
         styleOverrides: {
            root: {
               borderRadius: 12,
               height: 24,
               fontSize: 12,
               variants: [
                  {
                     props: { variant: 'grey' },
                     style: {
                        fontWeight: 600,
                        background: '#eee',
                        color: '#666',
                     },
                  },
                  {
                     props: { variant: 'green' },
                     style: {
                        fontWeight: 700,
                        color: '#45843C',
                        background: '#DBE7D9',
                     },
                  },
                  {
                     props: { variant: 'yellow' },
                     style: {
                        fontWeight: 700,
                        color: '#B25F00',
                        background: '#FFCC4D',
                     },
                  },
                  {
                     props: { variant: 'outlined' },
                     style: {
                        fontWeight: 700,
                        color: '#666',
                        border: '#666 1px solid',
                     },
                  },
                  {
                     props: { variant: 'filled' },
                     style: {
                        fontWeight: 600,
                        background: '#222',
                        color: '#fff',
                     },
                  },
               ],
            },
         },
      },
      MuiStack: {
         styleOverrides: {
            root: {
               flexDirection: 'row',
               alignItems: 'center',
            },
         },
      },
      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: 10,
               height: 32,
               fontSize: 12,
               variants: [
                  {
                     props: { variant: 'contained' },
                     style: {
                        fontWeight: 600,
                        boxShadow: 'none',
                        ':hover': { boxShadow: 'none', background: '#d97400' },
                     },
                  },
                  {
                     props: { variant: 'outlined' },
                     style: {
                        fontWeight: 700,
                     },
                  },
                  {
                     props: { variant: 'text' },
                     style: {
                        fontWeight: 700,
                        ':hover': { background: '#DBE7D9' },
                     },
                  },
                  {
                     props: { variant: 'thin' },
                     style: {
                        fontSize: 13,
                        fontWeight: 500,
                        ':hover': { background: 'none' },
                     },
                  },
               ],
            },
         },
      },
   },
})
