import { getAccessToken } from "../auth/tokenServices";
import { getTitle, getContent } from "./functions";
import { fetchNotes } from "./functions";
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
import { IoIosWarning } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function MenuBar({ editor, active, setActive, setNotes }) {
  // State to control the visibility of the help modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Function to toggle the help modal
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };
  const location = useLocation();
  const path = location.pathname;
  // if (path === "/recycle-bin") {
  //   setActive("");
  // }
  if (!editor) {
    return null;
  }

  return (
    <div className={`${path !== "/recycle-bin" ? "menu-bar" : "bin-bar"}`}>
      <div className="delete-note-box">
        {path !== "/recycle-bin" ? (
          <button onClick={() => handleDeleteNote(active, setNotes)}>
            <FaTrash />
          </button>
        ) : (
          <button
            className="restore-btn"
            onClick={() => handleRecoverNote(active, setNotes)}
          >
            <MdRestore className="restore-icon" />
            <p>Restore</p>
          </button>
        )}
      </div>
      {path !== "/recycle-bin" && (
        <>
          {" "}
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
        </>
      )}
      <div className="save-note-box">
        <button
          onClick={() =>
            path !== "/recycle-bin"
              ? active.id
                ? handleUpdateNote(editor, active, setNotes)
                : handleSaveNewNote(editor, setNotes)
              : toggleConfirmModal()
          }
        >
          {path !== "/recycle-bin" ? <FaSave /> : <FaTrash />}
        </button>
      </div>
      {showConfirmModal && (
        <ConfirmDelete
          active={active}
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          handleDeletePermanent={handleDeleteNotePermanent}
          setNotes={setNotes}
        />
      )}
    </div>
  );
}

const ConfirmDelete = (props) => {
  const handleClick = (e) => {
    // Prevent event propagation to the parent div (help-modal)
    e.stopPropagation();
  };

  const active = props.active;
  const deletePermanent = () => {
    props.handleDeletePermanent(active, props.setNotes);
    props.setShowConfirmModal(!props.showConfirmModal);
  };

  return (
    <div
      className="confirm-delete"
      onClick={() => {
        props.setShowConfirmModal(!props.showConfirmModal);
      }}
    >
      <div className="delete-box" onClick={handleClick}>
        <div>
          <IoIosWarning className="warning-icon" />
        </div>
        <div className="delete-text">
          <h3>Delete Permanently</h3>
          <p>
            This note will be deleted permanently. <br /> This action
            <b> cannot</b> be undone.
          </p>
        </div>
        <div className="logout-buttons">
          <button className="logout-confirm" onClick={deletePermanent}>
            Confirm
          </button>

          <button
            className="logout-cancel"
            onClick={() => {
              props.setShowConfirmModal(!props.showConfirmModal);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const handleSaveNewNote = async (editor, setNotes) => {
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
    fetchNotes(setNotes);
  } catch (error) {
    console.error("Add Note Error: ", error);
  }
};

const handleUpdateNote = async (editor, active, setNotes) => {
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
    // console.log([notesId, title, content, editDate]);
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
    fetchNotes(setNotes);
  } catch (error) {
    console.error("Update Note Error: ", error);
  }
};

const handleDeleteNote = async (active, setNotes) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const notesId = active.id;
    const deleteDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    console.log(notesId);

    await axios.put(
      "http://localhost:5000/recycle-note",
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
    fetchNotes(setNotes);
  } catch (error) {
    console.error("Delete Note Error: ", error);
  }
};

const handleRecoverNote = async (active, setNotes) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const notesId = active.id;

    await axios.put(
      "http://localhost:5000/recover-note",
      {
        notes_id: notesId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    fetchNotes(setNotes);
  } catch (error) {
    console.error("Delete Note Error: ", error);
  }
};

const handleDeleteNotePermanent = async (active, setNotes) => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("Token not found");
      return;
    }

    const notesId = active.id;

    await axios.delete("http://localhost:5000/delete-note", {
      data: { notes_id: notesId },
      headers: {
        Authorization: token,
      },
    });
    fetchNotes(setNotes);
  } catch (error) {
    console.error("Delete Note Error: ", error);
  }
};
