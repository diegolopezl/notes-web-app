import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import { setAccessToken, refreshAccessToken } from "../auth/tokenServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter valid credentials");
        return;
      }

      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data && response.data.token) {
        // Login successful
        setAccessToken(response.data.token);

        // Save refresh token if provided
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        // Refresh access token
        await refreshAccessToken();

        // Navigate to the /notes route on successful login
        navigate("/notes");
      } else {
        // Handle unexpected response
        setError("Internal server error");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || "Internal server error"
      );
      setError(error.response?.data?.error || "Internal server error");
    }
  };

  return (
    <div className="signup-page">
      <div className="form-section">
        <form>
          <div className="form-title">
            <h1>Welcome!</h1>
            <p>
              Don't have an account?{" "}
              <Link className="reroute" to="../signup">
                Sign up
              </Link>
            </p>
          </div>
          <div className="input-boxes">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              // Add a style to indicate an error
              style={{
                border: error && "1px solid rgb(250, 0, 0)",
              }}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              // Add a style to indicate an error
              style={{
                border: error && "1px solid rgb(250, 0, 0)",
              }}
            />
          </div>
          {error && (
            <div className="invalid-input">
              <p>{"Invalid user or password"}</p>
            </div>
          )}
          <button className="submit-btn" type="button" onClick={handleLogin}>
            Sign In
          </button>
        </form>
      </div>
      <div className="bg-image-login"></div>
    </div>
  );
}
