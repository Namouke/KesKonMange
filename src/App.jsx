import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import ShoppingHistoryPage from "./pages/ShoppingHistoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onShowRegister={() => navigate("/register")}
            />
          }
        />

        <Route
          path="/register"
          element={<Register onRegisterSuccess={() => navigate("/login")} />}
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home onLogout={handleLogout} />} />
      <Route path="/historique" element={<ShoppingHistoryPage />} />
    </Routes>
  );
}

export default App;
