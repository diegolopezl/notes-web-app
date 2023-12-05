import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoteCard from "./NoteCard";
import { fetchNotes } from "./functions";

export default function NotesList({ search, setActive, notes, setNotes }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const location = useLocation();
  const path = location.pathname;
  const excludeStates = {
    "/recycle-bin": 0,
    "/notes": 1,
  };

  useEffect(() => {
    // Use fetchNotes inside the useEffect hook
    fetchNotes(setNotes);
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleCardClick = (clickedNote) => {
    // console.log("Clicked Note:", clickedNote);
    setActive(clickedNote);
    setSelectedNote(clickedNote);
  };

  return (
    <div className="notes-list">
      {notes
        ?.filter(
          (note) =>
            note.state !== excludeStates[path] &&
            (note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.content.toLowerCase().includes(search.toLowerCase()))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
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
