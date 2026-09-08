
import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function handleLogin() {
    setIsLoggedIn(true)
  }

  return isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />
}

export default App