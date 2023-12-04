import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAccessToken, clearRefreshInterval } from "../auth/tokenServices";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Logout() {
  const navigate = useNavigate();

  // State to control the visibility of the help modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Function to toggle the help modal
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

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
      <button className="nav-button" onClick={toggleConfirmModal}>
        <RiLogoutBoxRLine className="nav-icon" />
      </button>
      {showConfirmModal && (
        <ConfirmLogout
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

const ConfirmLogout = (props) => {
  const handleClick = (e) => {
    // Prevent event propagation to the parent div (help-modal)
    e.stopPropagation();
  };

  return (
    <div
      className="confirm-logout"
      onClick={() => {
        props.setShowConfirmModal(!props.showConfirmModal);
      }}
    >
      <div className="logout-box" onClick={handleClick}>
        <div className="logout-text">
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to exit?</p>
        </div>
        <div className="logout-buttons">
          <button className="logout-confirm" onClick={props.handleLogout}>
            Confirm
          </button>

          <button
            className="logout-cancel"
            onClick={() => {
              props.setShowConfirmModal(!props.showConfirmModal);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
