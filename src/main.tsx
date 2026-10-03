import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/fredoka'
import '@fontsource-variable/nunito'
import './styles/tokens.css'
import './styles/app.css'
import './styles/materials.css'
import { App } from './app/App'

// Every full document load begins a fresh session at Home. No persisted state.
if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
  window.history.replaceState(null, '', '/')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
