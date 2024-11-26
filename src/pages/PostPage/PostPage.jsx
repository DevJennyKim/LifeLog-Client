import './PostPage.scss';
import PostList from '../../components/PostList/PostList';
import { useEffect, useState } from 'react';
import { getPosts, getPostsByCategory } from '../../api/api';
import { Link, useParams } from 'react-router-dom';

function PostPage() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const data = await getPostsByCategory(categoryId);
        setPosts(data || []);
        console.log('data by category ', data);
      } catch (error) {}
    };
    if (categoryId) {
      fetchPostsByCategory();
    }
  }, [categoryId]);
  const categoryTitle =
    categoryId && posts.length > 0 ? posts[0].category_name : 'All Post';
  return (
    <section className="posts">
      <div className="posts__container">
        <div className="posts__title-container">
          <h1 className="posts__title">{categoryTitle}</h1>
        </div>
        <div className="posts__list">
          {posts && posts.map((post) => <PostList key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}

export default PostPage;
