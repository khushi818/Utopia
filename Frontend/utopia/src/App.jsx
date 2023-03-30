import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Notification from "./Pages/Notification"
import Profile from "./Pages/Profile"
import Profile_setting from "./Pages/Profile_setting"
import Utopia_meet from "./Pages/Utopia_meet"
import PrivateRoute from "./utils/PrivateRoute"

function App() {
  return (
    <div className="App bg-main">
      <Routes>
        {/* <Route element={<PrivateRoute />} path="/" exact > */}
        <Route element={<Dashboard />} path="/" />
        {/* </Route> */}
        <Route element={<Profile />} path="/profile" exact />
        <Route element={<Profile_setting />} path="/profile_setting" exact />
        <Route element={<Notification />} path="/notification" exact />
        <Route element={<Utopia_meet />} path="/utopia_meet/:code" exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
      </Routes>
    </div>
  )
}

export default App
