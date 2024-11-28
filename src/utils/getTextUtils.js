const getTextWithHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.innerHTML;
};

export default getTextWithHTML;
