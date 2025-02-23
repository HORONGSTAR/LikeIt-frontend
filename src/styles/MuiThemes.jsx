import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#222',
         light: '#666',
         dark: '#222',
         contrastText: '#fff',
      },
      yellow: {
         main: '#FFCC4D',
         light: '#ffe190',
         dark: '#fec443',
         contrastText: '#B25F00',
      },
      orenge: {
         main: '#d97400',
         light: '#e38d05',
         dark: '#d26500',
         contrastText: '#fff',
      },
      green: {
         main: '#45843C',
         light: '#4f9546',
         dark: '#32652b',
         contrastText: '#fff',
      },
   },
   typography: {
      h1: { fontSize: 32, fontWeight: 600, color: '#222' },
      h2: { fontSize: 28, fontWeight: 600, color: '#222' },
      h3: { fontSize: 24, fontWeight: 600, color: '#222' },
      h4: { fontSize: 20, fontWeight: 600, color: '#222' },
      h5: { fontSize: 18, fontWeight: 600, color: '#222' },
      h6: { fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#222' },
      body1: { fontSize: 15, fontWeight: 400 },
      body2: { fontSize: 13, fontWeight: 400 },
      caption: { fontSize: 11, fontWeight: 500 },
      fontFamily: "'Pretendard', 'sans-serif'",
   },
   breakpoints: {
      values: {
         xs: 0,
         sm: 500,
         md: 920,
      },
   },

   components: {
      MuiPickersDay: {
         styleOverrides: {
            root: {
               '&.Mui-selected': {
                  backgroundColor: '#45843C !important',
               },
            },
         },
      },
      MuiAppBar: {
         styleOverrides: {
            root: {
               '--AppBar-background': '#fff',
               '--AppBar-color': '#222',
               boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
            },
         },
      },
      MuiAccordion: {
         styleOverrides: {
            root: {
               boxShadow: 'none',
            },
         },
      },

      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               borderRadius: 10,
            },
            notchedOutline: {
               borderRadius: 10,
            },
            input: {
               padding: '12px 14px',
            },
            multiline: {
               padding: 0,
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            root: {
               top: '-4px',
               fontSize: '14px',
            },
            shrink: {
               top: '0px',
            },
         },
      },

      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: 10,
               display: 'flex',
               variants: [
                  {
                     props: { variant: 'none' },
                     style: {
                        boxShadow: 'none',
                        border: 'none',
                        flexWrap: 'wrap',
                        gap: 10,
                     },
                  },
               ],
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
                        ':hover': {
                           backgroundColor: '#666',
                        },
                     },
                  },
               ],
            },
         },
      },

      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: 10,
               height: 32,
               fontSize: 12,
               margin: 4,
               variants: [
                  {
                     props: (props) => props.variant === 'contained' && props.color === 'primary',
                     style: {
                        fontWeight: 600,
                        boxShadow: 'none',

                        ':hover': {
                           boxShadow: 'none',
                           backgroundColor: '#444',
                        },
                     },
                  },
                  {
                     props: { variant: 'contained' },
                     style: {
                        fontWeight: 600,
                        boxShadow: 'none',
                        ':hover': { boxShadow: 'none' },
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
                     },
                  },
                  {
                     props: { variant: 'yellow' },
                     style: {
                        fontWeight: 700,
                        color: '#B25F00',
                        background: '#FFCC4D',
                        ':hover': {
                           background: '#fdb73e',
                        },
                     },
                  },
                  {
                     props: { variant: 'green' },
                     style: {
                        fontWeight: 700,
                        color: '#45843C',
                        background: '#DBE7D9',
                        ':hover': {
                           background: '#b9d6b2',
                        },
                     },
                  },
                  {
                     props: { size: 'small' },
                     style: {
                        padding: '10px 14px',
                     },
                  },
                  {
                     props: { size: 'large' },
                     style: {
                        padding: '20px 48px',
                        fontSize: 14,
                     },
                  },
               ],
            },
         },
      },
   },
})
