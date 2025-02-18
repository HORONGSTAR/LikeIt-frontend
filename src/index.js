import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './styles/MuiThemes'
import { ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   //  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
         <ThemeProvider theme={theme}>
            <App />
         </ThemeProvider>
      </BrowserRouter>
   </Provider>
   //  </React.StrictMode>
)

reportWebVitals()
