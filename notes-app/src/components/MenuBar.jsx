import { getAccessToken } from "../auth/tokenServices";
import { getTitle, getContent } from "./functions";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaStrikethrough,
  FaUnderline,
  FaSave,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleSaveNote = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      const title = getTitle(editor);
      const content = getContent(editor);
      const defaultContent = content ? content : "<p>No text.</p>";

      const createdDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      // Server-side logout
      await axios.post(
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
    } catch (error) {
      console.error("Add Note Error: ", error);
    }
  };

  return (
    <div className="menuBar">
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
      <button onClick={() => handleSaveNote()}>
        <FaSave />
      </button>
    </div>
  );
};

export default MenuBar;
