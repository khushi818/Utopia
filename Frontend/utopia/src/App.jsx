import { Route, Routes } from "react-router-dom"

import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Notification from "./Pages/Notification"

function App() {
  return (
    <div className="App bg-main">
      <Routes>
        <Route element={<Dashboard />} path="/" exact />
        <Route element={<Notification />} path="/notification" exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
