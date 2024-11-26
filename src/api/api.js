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
export { getCategory, getPosts };
