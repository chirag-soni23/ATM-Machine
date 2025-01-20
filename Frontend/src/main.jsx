import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { AtmProvider } from './context/AtmContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AtmProvider>
        <App />
      </AtmProvider>
    </UserProvider>
  </StrictMode>,
)
