import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        setEmptyFieldError("Please fill in all the fields");
        return;
      }

      if (validatePassword()) {
        const response = await axios.post("http://localhost:5000/register", {
          name,
          email,
          password,
        });

        console.log(response.data);
        // Navigate to the /signin route on successful registration
        navigate("/signin");
        // You can also add any other logic you need after successful registration
      } else {
        console.error("Password does not meet requirements");
        // Handle password validation error
      }
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      // Handle registration error
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }

    setPasswordError("");
    return true;
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
            <InputField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Smith"
              // Add a style to indicate an error
              style={{
                border: emptyFieldError && !name && "1px solid rgb(250, 0, 0)",
              }}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              // Add a style to indicate an error
              style={{
                border: emptyFieldError && !email && "1px solid rgb(250, 0, 0)",
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
                border:
                  (emptyFieldError && !password) || passwordError
                    ? "1px solid rgb(250, 0, 0)"
                    : "",
              }}
            />
            {passwordError && (
              <div className="invalid-password">
                <p>{passwordError}</p>
              </div>
            )}
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
