import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
    return data;
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
    console.log('API called with ID:', postId);
    const url = '/api/posts/';
    const { data } = await axios.get(`${baseUrl}${url}${postId}`);
    console.log(`${baseUrl}${url}${postId}`);
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching posts by id:', error);
    throw error;
  }
};
export { getCategory, getPosts, getPostsByCategory, getSinglePostsById };
