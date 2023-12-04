import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import NotesList from "./NotesList";
import FolderList from "./FolderList";
import SearchBar from "./SearchBar";
export default function NotesPanel() {
  return (
    <section className="notes-panel">
      <SearchBar />
      <div className="notes-section">
        <ListTitle title="MY NOTES" addAction={console.log("add note")} />
        <NotesList />
      </div>
      {/* <div className="folders-section">
        <ListTitle title="FOLDERS" addAction={console.log("add folder")} />
        <FolderList />
      </div> */}
    </section>
  );
}

const ListTitle = ({ title, addAction }) => {
  return (
    <div className="list-title-box">
      <p className="list-title">{title}</p>
      <button className="add-button" onClick={addAction}>
        <FaPlus />
      </button>
    </div>
  );
};
