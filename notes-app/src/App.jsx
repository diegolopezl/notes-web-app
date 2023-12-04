import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import "./styles/App.css";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/notes" element={<Dashboard />} />
          <Route path="/recycle-bin" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
