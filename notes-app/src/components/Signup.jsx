import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      console.log(response.data);
      // Add any other logic you need after successful registration
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      // Handle registration error
    }
  };

  return (
    <div className="signup-page">
      <div className="form-section">
        <form>
          <div className="form-title">
            <h1>Create an Account</h1>
            <p>
              Start note-taking now and organize your thoughts with ease. Join
              us!
            </p>
          </div>
          <div className="input-boxes">
            <div className="input-field">
              <h4>Name</h4>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Smith"
              ></input>
            </div>
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
          <button className="submit-btn" type="button" onClick={handleRegister}>
            Create your account
          </button>
          <p>
            Already have an account?{" "}
            <Link className="reroute" to="../signin">
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <div className="bg-image-login"></div>
    </div>
  );
}
