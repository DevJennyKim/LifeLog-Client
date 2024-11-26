import './PostDetailPage';
import PostListInDetail from '../../components/PostListInDetail/PostListInDetail';
import PostDetail from '../../components/PostDetail/PostDetail';
import Comments from '../../components/Comments/Comments';
function PostDetailPage() {
  return (
    <div>
      <section className="post-list-in-detail">
        <div className="post-list-in-detail__container">
          <div className="post-list-in-detail__title-container">
            <h1 className="post-list-in-detail__title">
              Other posts you might be interested in
            </h1>
          </div>
          <div className="post-list-in-detail__list">
            <PostListInDetail />
          </div>
        </div>
      </section>

      <PostDetail />
      <Comments />
    </div>
  );
}

export default PostDetailPage;
