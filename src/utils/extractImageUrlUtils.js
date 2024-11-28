const extractImageUrlsAndCleanHTML = (htmlContent) => {
  const imageUrls = [];

  const regex = /<img[^>]+src="([^">]+)"/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    imageUrls.push(match[1]);
  }
  const cleanHTML = htmlContent.replace(/<img[^>]+>/g, '');
  return { imageUrls, cleanHTML };
};
