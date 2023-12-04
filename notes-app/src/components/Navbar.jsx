import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt, BiNote, BiTrash, BiHelpCircle } from "react-icons/bi";

import { TbSettings2 } from "react-icons/tb";
import iconSvg from "../assets/icon.svg";
import Logout from "../auth/Logout";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // State to control the visibility of the help modal
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Function to toggle the help modal
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  return (
    <aside className="nav-sidebar">
      <div className="dashboard-icon">
        <img className="page-icon" src={iconSvg} alt="Icon" />
      </div>
      <nav className="nav-bar">
        <div className="nav-links">
          <Link className="nav-button" to="../">
            <BiHomeAlt className="nav-icon" />
          </Link>
          <Link
            className={`nav-button ${
              path === "/notes" ? "nav-notes-color" : ""
            }`}
            to="/notes"
          >
            <BiNote className="nav-icon" />
          </Link>
          <Link
            className={`nav-button ${
              path === "/recycle-bin" ? "nav-recycle-color" : ""
            }`}
            to="../recycle-bin"
          >
            <BiTrash className="nav-icon" />
          </Link>
        </div>
      </nav>
      <div className="settings-help">
        <Logout />
        <button className="nav-button" onClick={toggleHelpModal}>
          <BiHelpCircle className="nav-icon" />
        </button>
        <button className="nav-button">
          <TbSettings2 className="nav-icon" />
        </button>
      </div>

      {showHelpModal && (
        <Shortcuts
          showHelpModal={showHelpModal}
          setShowHelpModal={setShowHelpModal}
        />
      )}
    </aside>
  );
}

const Shortcuts = (props) => {
  const handleModalClick = (e) => {
    // Prevent event propagation to the parent div (help-modal)
    e.stopPropagation();
  };

  return (
    <div
      className="help-modal"
      onClick={() => {
        props.setShowHelpModal(!props.showHelpModal);
      }}
    >
      <div className="modal-content" onClick={handleModalClick}>
        <div>
          <p>Bold</p>
          <p>Ctrl + B</p>
        </div>
        <div>
          <p>Italic</p>
          <p>Ctrl + I</p>
        </div>
        <div>
          <p>Underline</p>
          <p>Ctrl + U</p>
        </div>
        <div>
          <p>Strikethrough</p>
          <p>Ctrl + Shift + S</p>
        </div>
        <div>
          <p>Undo</p>
          <p>Ctrl + Z</p>
        </div>
        <div>
          <p>Redo</p>
          <p>Ctrl + Y</p>
        </div>
        <div>
          <p>Hard Break</p>
          <p>Shift + Enter</p>
        </div>

        <div>
          <p>Numbered List</p>
          <p>Ctrl + Shift + 7</p>
        </div>
        <div>
          <p>Bullet List</p>
          <p>Ctrl + Shift + 8</p>
        </div>
        <div>
          <p>Check List</p>
          <p>Ctrl + Shift + 9</p>
        </div>
      </div>
    </div>
  );
};
