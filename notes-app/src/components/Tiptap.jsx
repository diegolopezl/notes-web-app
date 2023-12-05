import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import "../styles/TextEditor.css";

import { extensions, limit } from "./tiptapExtensions";
import MenuBar from "./MenuBar";
import { useLocation } from "react-router-dom";

export default function Tiptap({ active, setActive, setNotes }) {
  const [text, setText] = useState("");

  // const location = useLocation();
  // const path = location.pathname;
  useEffect(() => {
    setText(`${active.title + active.content}`);
  }, [active]);

  const editor = useEditor({
    extensions: extensions,
    content: text,
  });

  useEffect(() => {
    if (editor) {
      editor.chain().setContent(text).run();
    }
  }, [text, editor]);

  if (!active || active.length === 0 || !editor) {
    return (
      <div className="editor-placeholder">
        <p>Choose a note to begin.</p>
      </div>
    ); // or return placeholder content
  }

  return (
    <div className="textEditor">
      <MenuBar
        editor={editor}
        active={active}
        setActive={setActive}
        setNotes={setNotes}
      />
      <EditorContent editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()}/{limit} characters
      </div>
    </div>
  );
}
