import { useState } from "react";
import { Route, Routes } from "react-router";
import ShoppingHistoryPage from "./pages/ShoppingHistoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const [showRegister, setShowRegister] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegisterSuccess={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home onLogout={handleLogout} />} />
      <Route path="/historique" element={<ShoppingHistoryPage />} />
    </Routes>
  );
}

export default App;
