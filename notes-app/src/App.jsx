import { useState } from "react";
import axios from "axios";
import "./styles/App.css";

export default function App() {
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
    <>
      <div>
        <h1>Create an Account</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••••••"
        />
        <br />
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  );
}
