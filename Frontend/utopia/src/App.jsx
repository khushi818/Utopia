import { useState } from 'react'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/dashboard'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App bg-main">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
