import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home/'
import Topo from './Components/Topo'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Topo />
    <Home />
  </StrictMode>,
)
