// Dashboard.jsx

import { useState } from "react";
// import Logout from "../auth/Logout";
import Tiptap from "./Tiptap";
import Navbar from "./Navbar";
import NotesPanel from "./NotesPanel";

export default function Dashboard() {
  const [active, setActive] = useState([]);
  console.log(active);
  return (
    <section className="dashboard">
      <Navbar />
      <NotesPanel setActive={setActive} />
      <Tiptap active={active} />
    </section>
  );
}
