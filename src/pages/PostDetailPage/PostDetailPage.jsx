import './PostDetailPage.scss';
import PostListInDetail from '../../components/PostListInDetail/PostListInDetail';
import PostDetail from '../../components/PostDetail/PostDetail';
import Comments from '../../components/Comments/Comments';
import { getPosts, getSinglePostsById } from '../../api/api';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function PostDetailPage() {
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  console.log('postId:', postId);
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
    const fetchPostsById = async () => {
      try {
        console.log('Fetching post by ID:', postId);
        const data = await getSinglePostsById(postId);
        console.log('Fetched post data:', data);
        setSinglePost(data || {});
      } catch (error) {
        console.error('Error fetching single post by ID:', error);
      }
    };
    if (postId) {
      fetchPostsById();
    }
  }, [postId]);

  return (
    <main className="post-detail-page">
      <section className="post-detail-page__list">
        <PostListInDetail posts={posts} />
      </section>
      <section className="post-detail-page__content">
        <PostDetail singlePost={singlePost} />
        <Comments />
      </section>
    </main>
  );
}

export default PostDetailPage;
