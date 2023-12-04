import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import "../styles/TextEditor.css";

import { extensions, limit } from "./tiptapExtensions";
import MenuBar from "./MenuBar";

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

  if (!editor) {
    return null;
  }

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="character-count">
        {editor.storage.characterCount.characters()}/{limit} characters
      </div>
    </div>
  );
}
