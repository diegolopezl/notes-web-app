import { EditorContent, useEditor } from "@tiptap/react";
import "../styles/TextEditor.css";

import { extensions, limit } from "./tiptapExtensions";
import MenuBar from "./MenuBar";
export default function Tiptap() {
  const editor = useEditor({
    extensions: extensions,
    content: ``,
  });

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
