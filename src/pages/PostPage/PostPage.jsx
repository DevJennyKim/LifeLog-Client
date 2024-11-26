import './PostPage.scss';
import PostList from '../../components/PostList/PostList';
import { useEffect, useState } from 'react';
import { getPosts } from '../../api/api';

function PostPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data || []);
        console.log(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <section className="posts">
      <div className="posts__container">
        <div className="posts__title-container">
          <h1 className="posts__title">All Post</h1>
        </div>
        <div className="posts__list">
          {posts && posts.map((post) => <PostList key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}

export default PostPage;
