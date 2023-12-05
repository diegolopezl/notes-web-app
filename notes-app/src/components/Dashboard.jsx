// Dashboard.jsx

import { useState } from "react";
// import Logout from "../auth/Logout";
import Tiptap from "./Tiptap";
import Navbar from "./Navbar";
import NotesPanel from "./NotesPanel";

export default function Dashboard() {
  const [active, setActive] = useState([]);
  const [notes, setNotes] = useState([]);
  // console.log(notes);

  // console.log(active);
  return (
    <section className="dashboard">
      <Navbar />
      <NotesPanel setActive={setActive} notes={notes} setNotes={setNotes} />
      <Tiptap
        active={active}
        setActive={setActive}
        notes={notes}
        setNotes={setNotes}
      />
    </section>
  );
}
