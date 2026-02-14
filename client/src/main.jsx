import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="437631368061-uprepor9mk1o9jv6320snbo13latjb48.apps.googleusercontent.com">
     <App/>
    </GoogleOAuthProvider>  
    </BrowserRouter>
  </StrictMode>,

)
