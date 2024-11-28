import './AddPostPage.scss';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/toastui-editor.css';
import { useEffect, useRef, useState } from 'react';
import { getCategory, createPost, uploadImage } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddPostPage() {
  const editorRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('postContent', postContent);
    const { imageUrls, cleanHTML } = extractImageUrlsAndCleanHTML(postContent);
    console.log('cleanHTML', cleanHTML);
    console.log('imageUrls', imageUrls);
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
      const response = await createPost(postData);
      if (response) {
        alert('Post created successfully');
        navigate(-1);
      } else {
        alert('Failed to create post');
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
            <h1 className="write__title">Write your Life</h1>
          </div>
          <form className="write__form" onSubmit={handleSubmit}>
            <div className="write__contents">
              <input
                type="text"
                className="write__input-title"
                placeholder="Title"
              />
              <div className="write__category-container">
                <select
                  id="category"
                  className="write__category-select"
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
            <button type="submit" className="write__submit">
              Publish
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddPostPage;
