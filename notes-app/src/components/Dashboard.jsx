// Dashboard.jsx

import React from "react";
import Logout from "../auth/Logout";
import Tiptap from "./Tiptap";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <section className="dashboard">
      <Navbar />
      <section></section>
      <Tiptap />
    </section>
  );
}
