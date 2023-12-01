// Logout.jsx

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./tokenServices";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.post("http://localhost:5000/logout", null, {
        headers: {
          Authorization: token,
        },
      });

      localStorage.removeItem("token"); // Remove the access token from localStorage
      localStorage.removeItem("refreshToken"); // Remove the refresh token from localStorage

      navigate("/signin");
    } catch (error) {
      console.error(
        "Logout Error:",
        error.response?.data || "Internal server error"
      );
      // Handle error as needed
    }
  };

  return (
    <div>
      <button
        style={{ height: "100px", width: "100px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
