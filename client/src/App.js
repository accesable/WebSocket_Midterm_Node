import React from "react";
import ChatBox from "./ChatBox";
import Login from "./compoents/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./compoents/ProtectedRoute";

function LoginHandler() {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    // Implement your login logic here
    console.log("Logging in:", username);
    localStorage.setItem("username", username);
    navigate("/chat");
  };

  return <Login onLogin={handleLogin} />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LoginHandler />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatBox />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
