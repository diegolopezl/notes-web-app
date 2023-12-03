import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import BubbleMenu from "@tiptap/extension-bubble-menu";

export const limit = 2000;
export const extensions = [
  Document,
  Paragraph,
  Text,
  HardBreak.configure({
    keepMarks: false,
  }),
  BubbleMenu,
  History,
  CharacterCount.configure({
    limit: limit,
  }),
  Heading,
  Bold,
  Italic,
  Underline,
  Strike,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  BulletList,
  OrderedList,
  ListItem,
];
