import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const validatePassword = async (userId, password) => {
  try {
    const url = '/api/auth/validate-password';
    const { data } = await axios.post(url, { userId, password });
    return data;
  } catch (error) {
    console.error('Error validating password:', error);
    return { error: 'Failed to validate password' };
  }
};

const getCategory = async () => {
  try {
    const url = '/api/category';
    const { data } = await axios.get(`${baseUrl}${url}`);
    return data;
  } catch (error) {
    console.error('Error getting Category: ', error);
  }
};

const getPosts = async () => {
  try {
    const url = '/api/posts';
    const { data } = await axios.get(`${baseUrl}${url}`);
    const sortedData = data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return sortedData;
  } catch (error) {
    console.error('Error getting Posts: ', error);
  }
};
const getPostsByCategory = async (categoryId) => {
  try {
    const url = '/api/posts/category/';
    const { data } = await axios.get(`${baseUrl}${url}${categoryId}`);
    return data;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw error;
  }
};

const getSinglePostsById = async (postId) => {
  try {
    const url = '/api/posts/';
    const { data } = await axios.get(`${baseUrl}${url}${postId}`);
    return data;
  } catch (error) {
    console.error('Error fetching posts by id:', error);
    throw error;
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    const url = `/api/posts/${postId}/comments`;
    const { data } = await axios.get(`${baseUrl}${url}`);
    if (typeof data === 'string') {
      return data;
    } else {
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      return sortedData;
    }
  } catch (error) {
    console.error('Error fetching comments by post id:', error);
    throw error;
  }
};

const addComment = async (postId, userId, comment) => {
  try {
    const url = `/api/posts/${postId}/comments`;
    const response = await axios.post(`${baseUrl}${url}`, {
      userId,
      postId,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/posts/${postId}/comments/${commentId}`
    );
    return data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

const updateComment = async (postId, commentId, updatedComment) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/posts/${postId}/comments/${commentId}`,
      {
        comment: updatedComment,
      }
    );
    return data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
const uploadImage = async (formData) => {
  try {
    const url = '/api/posts/upload';
    const { data } = await axios.post(`${baseUrl}${url}`, formData);
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
const createPost = async (postData) => {
  try {
    const url = '/api/posts';
    const { data } = await axios.post(`${baseUrl}${url}`, postData);
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

const deletePost = async (postId) => {
  try {
    const url = `/api/posts/${postId}`;
    const { data } = await axios.delete(`${baseUrl}${url}`);
    return data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

const updatePost = async (postId, updateData) => {
  try {
    const url = `/api/posts/${postId}`;
    const { data } = await axios.put(`${baseUrl}${url}`, updateData);
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export {
  validatePassword,
  getCategory,
  getPosts,
  getPostsByCategory,
  getSinglePostsById,
  getCommentsByPostId,
  uploadImage,
  createPost,
  deletePost,
  updatePost,
  addComment,
  deleteComment,
  updateComment,
};
