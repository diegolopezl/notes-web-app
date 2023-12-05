import axios from "axios";
import { getAccessToken } from "../auth/tokenServices";
const fetchNotes = async (setNotes) => {
  try {
    const token = getAccessToken();
    const response = await axios.get("http://localhost:5000/get-note", {
      headers: {
        Authorization: token,
      },
    });
    setNotes(response.data.notes);
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

const parseHTMLContent = (htmlContent) => {
  // Use DOMParser to parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  return doc.body;
};

function getContent(editor) {
  // Get the HTML content
  const htmlContent = editor.getHTML();

  // Parse the HTML content
  const body = parseHTMLContent(htmlContent);

  // Remove the first child from the body
  if (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  // Get the updated HTML content without the first element
  const updatedHTMLContent = body.innerHTML;

  // Return the updated HTML content
  return updatedHTMLContent;
}

function getTitle(editor) {
  // Get the HTML content
  const htmlContent = editor.getHTML();

  // Parse the HTML content
  const body = parseHTMLContent(htmlContent);

  // Get the first child of the body
  const firstElement = body.firstChild;

  // Get the outerHTML of the first element
  const firstElementHTML = firstElement ? firstElement.outerHTML : null;

  // Return the first element's outerHTML
  return firstElementHTML;
}

function dateFormat(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US");
  return formattedDate;
}

function removeHtmlTags(input) {
  return input.replace(/<[^>]*>/g, "");
}

function truncateString(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

export {
  fetchNotes,
  getContent,
  getTitle,
  dateFormat,
  removeHtmlTags,
  truncateString,
};
