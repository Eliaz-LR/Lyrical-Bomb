import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
import { RoomProvider } from './context/RoomContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='flex flex-col h-screen'>
      <BrowserRouter>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </RoomProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
)
