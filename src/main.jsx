import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from "./components/LoginPage";
import SuccessPage from "./components/SuccessPage";
import LogoutPage from "./components/LogoutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
