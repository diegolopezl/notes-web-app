import { Link } from "react-router-dom";
import {
  BiHomeAlt,
  BiNote,
  BiTrash,
  BiUserCircle,
  BiHelpCircle,
} from "react-icons/bi";
import { TbSettings2 } from "react-icons/tb";
import iconSvg from "../assets/icon.svg";
export default function Navbar() {
  return (
    <aside className="nav-sidebar">
      <div className="dashboard-icon">
        <img className="page-icon" src={iconSvg} />
      </div>
      <nav className="nav-bar">
        <div className="nav-links">
          <Link className="nav-button" to="../signup">
            <BiUserCircle className="nav-icon" />
          </Link>
          <Link className="nav-button" to="../">
            <BiHomeAlt className="nav-icon" />
          </Link>
          <Link className="nav-button" to="/notes">
            <BiNote className="nav-icon" />
          </Link>
          <Link className="nav-button" to="../recycle-bin">
            <BiTrash className="nav-icon" />
          </Link>
        </div>
      </nav>
      <div className="settings-help">
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
