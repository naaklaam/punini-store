import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { StorePage } from "./StorePage";
import { ProfilePage } from "./ProfilePage";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userBalance, setUserBalance] = useState(2500);
  const navigate = useNavigate();

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem("punini-user");
    const savedBalance = localStorage.getItem("punini-balance");
    if (savedUser) {
      setIsAuthenticated(true);
      setUserName(savedUser);
      setUserBalance(savedBalance ? parseInt(savedBalance) : 2500);
    }
  }, []);

  // Save balance to localStorage
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("punini-balance", userBalance.toString());
    }
  }, [userBalance, isAuthenticated]);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUserName(username);
    localStorage.setItem("punini-user", username);
    navigate("/store");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("punini-user");
    localStorage.removeItem("punini-balance");
    navigate("/");
  };

  const handlePurchase = (amount: number) => {
    setUserBalance((prev) => prev - amount);
  };

  const handleRedeemCode = (amount: number) => {
    setUserBalance((prev) => prev + amount);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route
        path="/store"
        element={
          <StorePage
            userName={userName}
            userBalance={userBalance}
            onLogout={handleLogout}
            onPurchase={handlePurchase}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <ProfilePage
            userName={userName}
            userBalance={userBalance}
            onLogout={handleLogout}
            onRedeemCode={handleRedeemCode}
          />
        }
      />
      <Route path="/" element={<Navigate to="/store" replace />} />
      <Route path="*" element={<Navigate to="/store" replace />} />
    </Routes>
  );
};

export default Index;
