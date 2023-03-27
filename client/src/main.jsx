import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
import { RoomProvider } from './context/RoomContext'
import './index.css'
import DarkModeButton from './components/DarkModeButton'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeButton />
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
