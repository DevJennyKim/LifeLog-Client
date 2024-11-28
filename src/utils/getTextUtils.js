const getTextWithHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.innerHTML;
};
const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent;
};
export { getTextWithHTML, getText };
