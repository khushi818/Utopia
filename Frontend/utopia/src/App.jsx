import { useState } from 'react'
import Login from './Pages/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App bg-dark">
      <Login />
    </div>
  )
}

export default App
