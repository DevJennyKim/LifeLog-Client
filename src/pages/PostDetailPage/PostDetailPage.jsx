import './PostDetailPage.scss';
import PostListInDetail from '../../components/PostListInDetail/PostListInDetail';
import PostDetail from '../../components/PostDetail/PostDetail';
import Comments from '../../components/Comments/Comments';
function PostDetailPage() {
  return (
    <main className="post-detail-page">
      <section className="post-detail-page__list">
        <PostListInDetail />
      </section>
      <section className="post-detail-page__content">
        <PostDetail />
        <Comments />
      </section>
    </main>
  );
}

export default PostDetailPage;
