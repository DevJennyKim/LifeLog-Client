import './PostPage.scss';
import PostList from '../../components/PostList/PostList';

function PostPage() {
  return (
    <section className="posts">
      <div className="posts__container">
        <div className="posts__title-container">
          <h1 className="posts__title">All Post</h1>
        </div>
        <div className="posts__list">
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
        </div>
      </div>
    </section>
  );
}

export default PostPage;
