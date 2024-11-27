import { Link } from 'react-router-dom';
import formatCreatedAt from '../../utils/dateUtils';

function PostListInDetail({ posts }) {
  return (
    <div className="post-list-in-detail">
      <div className="post-list-in-detail__container">
        <div className="post-list-in-detail__title-container">
          <h1 className="post-list-in-detail__title">Other posts</h1>
        </div>
        <div className="post-list-in-detail__list">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div className="post-list-in-detail__item">
                <img
                  src={post.img}
                  alt="postListImg"
                  className="post-list-in-detail__item-preview"
                />
                <div className="post-list-in-detail__item-content">
                  <h2 className="post-list-in-detail__item-title">
                    {post.title}
                  </h2>
                  <div className="post-list-in-detail__item-author">
                    <p className="post-list-in-detail__username">
                      {post.username}
                    </p>
                    <p className="post-list-in-detail__created-at">
                      {formatCreatedAt(post.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostListInDetail;
