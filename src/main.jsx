import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestEvent from './components/extras/TestEvent.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/test" element={<TestEvent />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
