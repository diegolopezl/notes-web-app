// NoteCard.js

import React from "react";
import { dateFormat, removeHtmlTags, truncateString } from "./functions";

export default function NoteCard({ note, onCardClick }) {
  const handleClick = () => {
    onCardClick(note);
  };

  return (
    <div className="note-card" onClick={handleClick}>
      <div className="note-card-title">
        <h4>{removeHtmlTags(note.title)}</h4>
      </div>
      <div className="note-card-preview">
        <p>{truncateString(removeHtmlTags(note.content), 50)}</p>
      </div>
      <div className="note-card-bottom">
        {/* <div className="note-card-tag">
          <p>Category</p>
        </div> */}
        <div className="note-card-date">
          <p>{dateFormat(note.date)}</p>
        </div>
      </div>
    </div>
  );
}
