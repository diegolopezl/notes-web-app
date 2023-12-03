import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt, BiNote, BiTrash, BiHelpCircle } from "react-icons/bi";
import { TbSettings2 } from "react-icons/tb";
import iconSvg from "../assets/icon.svg";
import Logout from "../auth/Logout";
export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <aside className="nav-sidebar">
      <div className="dashboard-icon">
        <img className="page-icon" src={iconSvg} />
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
        <button className="nav-button">
          <BiHelpCircle className="nav-icon" />
        </button>
        <button className="nav-button">
          <TbSettings2 className="nav-icon" />
        </button>
      </div>
    </aside>
  );
}
