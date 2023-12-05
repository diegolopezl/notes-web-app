import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import NotesList from "./NotesList";
import { useLocation } from "react-router-dom";
import { useState } from "react";
// import FolderList from "./FolderList";
import SearchBar from "./SearchBar";
export default function NotesPanel({ setActive, notes, setNotes }) {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const handleAddNote = () => {
    setActive({ title: "<h1></h1>", content: "" });
  };

  return (
    <section className="notes-panel">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="notes-section">
        <ListTitle
          title={`${
            path === "/notes"
              ? "MY NOTES"
              : path === "/recycle-bin"
              ? "RECYCLE BIN"
              : ""
          }`}
          addAction={handleAddNote}
        />
        <NotesList
          setActive={setActive}
          search={search}
          notes={notes}
          setNotes={setNotes}
        />
      </div>
      {/* <div className="folders-section">
        <ListTitle title="FOLDERS" addAction={console.log("add folder")} />
        <FolderList />
      </div> */}
    </section>
  );
}

const ListTitle = ({ title, addAction }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="list-title-box">
      <p className="list-title">{title}</p>
      {path !== "/recycle-bin" && (
        <button className="add-button" onClick={addAction}>
          <FaPlus />
        </button>
      )}
    </div>
  );
};
