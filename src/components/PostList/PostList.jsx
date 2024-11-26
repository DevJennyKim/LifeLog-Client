import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

function PostList({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="posts__item-link">
      <div className="posts__item">
        <img
          src={post && post.img}
          alt="postImgEG"
          className="posts__item-img"
        />
        <div className="posts__item-content">
          <h1 className="posts__item-title">{post && post.title}</h1>
          <p className="posts__item-p">{post && post.desc}</p>
          <div className="posts__item-author">
            <p className="posts__item-username">
              Posted by {post && post.username}
            </p>
            <p className="posts__item-created_at">
              {post && format(post.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostList;
