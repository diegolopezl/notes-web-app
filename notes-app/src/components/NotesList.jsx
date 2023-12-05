import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoteCard from "./NoteCard";
import axios from "axios";
import { getAccessToken } from "../auth/tokenServices";

export default function NotesList({ setActive }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const location = useLocation();
  const path = location.pathname;
  const excludeStates = {
    "/recycle-bin": 0,
    "/notes": 1,
  };
  const fetchNotes = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get("http://localhost:5000/get-note", {
        headers: {
          Authorization: token,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleCardClick = (clickedNote) => {
    console.log("Clicked Note:", clickedNote);
    setActive(clickedNote);
    setSelectedNote(clickedNote);
  };

  return (
    <div className="notes-list">
      {notes
        ?.filter((note) => note.state !== excludeStates[path])
        .map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onCardClick={handleCardClick}
            isSelected={selectedNote && selectedNote.id === note.id}
          />
        ))}
    </div>
  );
}

export const handleFetchNotes = () => {
  fetchNotes();
};
