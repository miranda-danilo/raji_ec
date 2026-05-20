import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // <- Si esta línea falta, Tailwind nunca cargará
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)