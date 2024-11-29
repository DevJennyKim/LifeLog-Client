import './PostDetailPage.scss';
import PostListInDetail from '../../components/PostListInDetail/PostListInDetail';
import PostDetail from '../../components/PostDetail/PostDetail';
import Comments from '../../components/Comments/Comments';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  getPosts,
  getSinglePostsById,
  getCommentsByPostId,
} from '../../api/api';

function PostDetailPage() {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);

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
        const data = await getSinglePostsById(postId);

        setSinglePost(data || {});
      } catch (error) {
        console.error('Error fetching single post by ID:', error);
      }
    };
    if (postId) {
      fetchPostsById();
    }
  }, [postId]);
  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        try {
          const data = await getCommentsByPostId(postId);
          setComments(data || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };
    fetchComments();
  }, [postId]);

  const filteredPosts = posts.filter((post) => post.id !== singlePost.id);

  return (
    <main className="post-detail-page">
      <section className="post-detail-page__list">
        <PostListInDetail posts={filteredPosts} />
      </section>
      <section className="post-detail-page__content">
        <PostDetail singlePost={singlePost} currentUser={currentUser} />
        <Comments
          comments={comments}
          singlePost={singlePost}
          currentUser={currentUser}
          setComments={setComments}
        />
      </section>
    </main>
  );
}

export default PostDetailPage;
