import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { RoomProvider } from './context/RoomContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    </BrowserRouter>
    <RoomProvider>
      <App />
    </RoomProvider>
  </React.StrictMode>,
)
