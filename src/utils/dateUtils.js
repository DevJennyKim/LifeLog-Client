import { format as timeAgoFormat } from 'timeago.js';

const formatCreatedAt = (createdAt) => {
  if (!createdAt || isNaN(new Date(createdAt))) {
    return '';
  }
  const postDate = new Date(createdAt);
  const now = new Date();

  const timeDifference = now - postDate;

  if (timeDifference < 86400000) {
    return timeAgoFormat(createdAt);
  } else {
    return postDate.toISOString().split('T')[0];
  }
};

export default formatCreatedAt;
