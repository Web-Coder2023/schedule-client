// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/null.scss";
import "./styles/style.scss";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import HomePageAdmin from "./pages/HomePageAdmin";
import PrivateRoute from "./routes/PrivateRoute";
import ConfirmationModal from "./components/Modal/ConfirmationModal";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={5000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conf" element={<ConfirmationModal />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <HomePageAdmin />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
