import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import { RoomProvider } from './context/RoomContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Home />
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
