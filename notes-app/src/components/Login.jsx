import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(response.data);
      // Add any other logic you need after successful login
    } catch (error) {
      console.error("Login Error:", error.response.data);
      // Handle login error
    }
  };

  return (
    <div className="signup-page">
      <div className="form-section">
        <form>
          <div className="form-title">
            <h1>Sign In</h1>
            <p>Organize your thoughts with ease. Welcome back!</p>
          </div>
          <div className="input-boxes">
            <div className="input-field">
              <h4>Email</h4>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
              />
            </div>
            <div className="input-field">
              <h4>Password</h4>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
              />
            </div>
          </div>
          <button className="submit-btn" type="button" onClick={handleLogin}>
            Log In
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="reroute" to="../signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <div className="bg-image-login"></div>
    </div>
  );
}
