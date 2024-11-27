import './AddPostPage.scss';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { useEffect, useRef, useState } from 'react';
import { getCategory } from '../../api/api';

function AddPostPage() {
  const editorRef = useRef();
  const [postContent, setPostContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
  return (
    <main>
      <section className="write">
        <div className="write__container">
          <div className="write__title-container">
            <h1 className="write__title">Write your Life</h1>
          </div>
          <form className="write__form">
            <div className="write__contents">
              <input type="text" className="write__title" placeholder="Title" />
              <div className="write__category-container">
                <label htmlFor="category" className="write__category-label">
                  Choose a Category:
                </label>
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
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['image', 'link'],
                  ['code', 'codeblock'],
                ]}
                height="500px"
                initialEditType="WTSIWTG"
                previewStyle="vertical"
                ref={editorRef}
                onChange={onChangeGetHTML}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddPostPage;
