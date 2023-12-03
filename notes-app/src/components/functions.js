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

export { getContent, getTitle };
