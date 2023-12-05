import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import "../styles/TextEditor.css";

import { extensions, limit } from "./tiptapExtensions";
import MenuBar from "./MenuBar";
// import BubbleMenu from "./BubbleMenu";

export default function Tiptap({ active }) {
  const [text, setText] = useState("");

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
      <MenuBar editor={editor} active={active} />
      <EditorContent editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()}/{limit} characters
      </div>
    </div>
  );
}
