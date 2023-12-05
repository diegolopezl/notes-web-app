import { getAccessToken } from "../auth/tokenServices";
import { getTitle, getContent } from "./functions";
import { handleFetchNotes } from "./NotesList";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaStrikethrough,
  FaUnderline,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const MenuBar = ({ editor, active }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      <div className="delete-note-box">
        <button onClick={() => handleDeleteNote(active)}>
          <FaTrash />
        </button>
      </div>
      <div className="tools">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive("taskList") ? "is-active" : ""}
        >
          <FaListCheck />
        </button>
      </div>
      <div className="save-note-box">
        <button
          onClick={() =>
            active.id
              ? handleUpdateNote(editor, active)
              : handleSaveNewNote(editor)
          }
        >
          <FaSave />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;

const handleSaveNewNote = async (editor) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const title = getTitle(editor);
    const content = getContent(editor);
    const defaultContent = content ? content : "<p>No text.</p>";

    const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    // Server-side logout
    await axios.put(
      "http://localhost:5000/create-note",
      {
        title: title,
        content: defaultContent,
        date_created: createdDate,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    handleFetchNotes();
  } catch (error) {
    console.error("Add Note Error: ", error);
  }
};

const handleUpdateNote = async (editor, active) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const notesId = active.id;
    const title = getTitle(editor);
    const content = getContent(editor);
    const editDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log([notesId, title, content, editDate]);
    // Server-side logout
    await axios.put(
      "http://localhost:5000/update-note",
      {
        notes_id: notesId,
        title: title,
        content: content,
        date_edited: editDate,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // handleFetchNotes();
  } catch (error) {
    console.error("Update Note Error: ", error);
  }
};

const handleDeleteNote = async (active) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const notesId = active.id;
    const deleteDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log(notesId);
    console.log(token);
    console.log(deleteDate);

    await axios.put(
      "http://localhost:5000/delete-note",
      {
        notes_id: notesId,
        date_deleted: deleteDate,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // handleFetchNotes();
  } catch (error) {
    console.error("Delete Note Error: ", error);
  }
};
