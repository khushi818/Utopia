import { useState } from 'react'
// import Login from './Pages/Login'
import dashboard from './Pages/dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App bg-main">
      <dashboard />
    </div>
  )
}

export default App
