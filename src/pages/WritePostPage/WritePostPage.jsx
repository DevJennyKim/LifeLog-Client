import './WritePostPage.scss';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { useEffect, useRef, useState } from 'react';
import {
  getCategory,
  createPost,
  uploadImage,
  updatePost,
} from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function WritePostPage({ action }) {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState({});
  const [post, setPost] = useState(null);

  const location = useLocation();
  const singlePost = location.state ? location.state.singlePost : null;

  useEffect(() => {
    if (action === 'update' && singlePost) {
      if (singlePost) {
        setPost(singlePost);
        setTitle(singlePost.title);
        setSelectedCategory(singlePost.category_id);
        setPostContent(`![image](${singlePost.img})`, singlePost.desc);
        if (editorRef.current) {
          editorRef.current.getInstance().setHTML(singlePost.desc || '');
        }
      }
    }
  }, [action, singlePost]);

  const onChangeGetHTML = () => {
    const data = editorRef.current.getInstance().getHTML();
    setPostContent(data);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const extractImageUrlsAndCleanHTML = (htmlContent) => {
    const imageUrls = [];

    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
      imageUrls.push(match[1]);
    }
    const cleanHTML = htmlContent.replace(/<img[^>]+>/g, '');
    return { imageUrls, cleanHTML };
  };

  const validateForm = () => {
    const errors = {};
    if (!title) {
      errors.title = 'error';
    }
    if (!selectedCategory) {
      errors.category = 'error';
    }
    if (!postContent || postContent.trim() === '<p><br></p>') {
      errors.content = 'Content is required';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { imageUrls, cleanHTML } = extractImageUrlsAndCleanHTML(postContent);
    const imageUrl =
      uploadedImages.length > 0 ? uploadedImages[0] : imageUrls[0] || '';

    const postData = {
      title: document.querySelector('.write__input-title').value,
      content: cleanHTML,
      categoryId: selectedCategory,
      imageUrl,
      userId: currentUser.id,
    };

    try {
      if (action === 'add') {
        const response = await createPost(postData);
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Post Created!',
            text: 'Your post is now live. Thank you for sharing your story.',
            position: 'center-center',
            timerProgressBar: true,
            timer: 1500,
            showConfirmButton: false,
            didClose: () => {
              navigate('/');
            },
          });
        }
      } else if (action === 'update') {
        console.log('update post data:', postData);
        const response = await updatePost(singlePost.id, postData);
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Post Updated!',
            text: 'Your post is updated! Thank you for sharing your story.',
            timer: 1500,
            showConfirmButton: false,
            didClose: () => {
              navigate(`/posts/${singlePost.id}`);
            },
          });
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const imageUploadHandler = async (blob, callback) => {
    const formData = new FormData();
    formData.append('image', blob);

    try {
      const data = await uploadImage(formData);
      if (data && data.imageUrl) {
        setUploadedImages((prev) => [...prev, data.imageUrl]);
        callback(data.imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <main>
      <section className="write">
        <div className="write__container">
          <div className="write__title-container">
            <h1 className="write__title">
              {action === 'add' ? 'Write your Life' : 'Edit your story'}
            </h1>
          </div>
          <form className="write__form" onSubmit={handleSubmit}>
            <div className="write__contents">
              <input
                type="text"
                className={`write__input-title ${
                  error.title ? 'write--error' : ''
                }`}
                onChange={handleTitleChange}
                value={title}
                placeholder="Title"
              />
              <div className="write__category-container">
                <select
                  id="category"
                  className={`write__category-select ${
                    error.category ? 'write--error' : ''
                  }`}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <Editor
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'indent', 'outdent'],
                  ['image', 'link'],
                ]}
                height="500px"
                initialEditType="wysiwyg"
                previewStyle="vertical"
                ref={editorRef}
                onChange={onChangeGetHTML}
                hooks={{
                  addImageBlobHook: imageUploadHandler,
                }}
              />
            </div>
            <div className="write__btn-container">
              <button type="submit" className="write__submit">
                {action === 'add' ? 'Publish' : 'Update'}
              </button>
              {error.content && (
                <p className="write__error write__error--left">
                  {error.content}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default WritePostPage;
