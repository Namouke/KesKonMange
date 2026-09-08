
import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function handleLogin() {
    setIsLoggedIn(true)
  }

  function handleLogout() {
  setIsLoggedIn(false);
}

  return isLoggedIn ? (
  <Home onLogout={handleLogout} />
) : (
  <Login onLogin={handleLogin} />
)
}

export default App