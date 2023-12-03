import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAccessToken, clearRefreshInterval } from "../auth/tokenServices";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      // Server-side logout
      await axios.post("http://localhost:5000/logout", null, {
        headers: {
          Authorization: token,
        },
      });

      // Clear tokens from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      clearRefreshInterval();
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
      <button className="nav-button" onClick={handleLogout}>
        <RiLogoutBoxRLine className="nav-icon" />
      </button>
    </div>
  );
}
