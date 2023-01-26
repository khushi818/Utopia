import { useState } from 'react'
// import Login from './Pages/Login'
import Dashboard from './Pages/dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App bg-main">
      <Dashboard />
    </div>
  )
}

export default App
