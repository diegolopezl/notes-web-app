import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/signin"
          element={<Login auth={auth} setAuth={setAuth} />}
        />
        <Route element={<PrivateRoute auth={auth} />}>
          <Route path="/notes" element={<Dashboard setAuth={setAuth} />} />
        </Route>
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}
