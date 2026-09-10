import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }

  return isLoggedIn ? (
    <Home onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
