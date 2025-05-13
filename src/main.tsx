import { BrowserRouter } from 'react-router-dom' /*keep your UI in sync with the URL without full page reloads.*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeadProvider } from 'react-head'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeadProvider>
        <App />
      </HeadProvider>
    </BrowserRouter>
  </StrictMode>,
)
