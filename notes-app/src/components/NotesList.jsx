import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import { getAccessToken } from "../auth/tokenServices";

export default function NotesList({ setActive }) {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    // Fetch notes data when the component mounts
    const fetchNotes = async () => {
      try {
        const token = getAccessToken(); // Retrieve the JWT token from your authentication process
        const response = await axios.get("http://localhost:5000/get-notes", {
          headers: {
            Authorization: token,
          },
        });
        setNotes(response.data.notes);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotes();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleCardClick = (clickedNote) => {
    console.log("Clicked Note:", clickedNote);
    setActive(clickedNote);
  };

  return (
    <div className="notes-list">
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} onCardClick={handleCardClick} />
      ))}
    </div>
  );
}
