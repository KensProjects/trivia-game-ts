import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Provider from './components/provider/Provider.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
      <ReactQueryDevtools />
    </Provider>
  </React.StrictMode>,
)
