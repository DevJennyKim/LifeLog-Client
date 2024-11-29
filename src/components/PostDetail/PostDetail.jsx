import { IoHeart } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';
import { useState } from 'react';
import { getTextWithHTML } from '../../utils/getTextUtils';
import { deletePost } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function PostDetail({ singlePost, currentUser }) {
  const isAuthor = currentUser?.name === singlePost?.username;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionsClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate(`/edit-post/${singlePost.id}`, { state: { singlePost } });
  };

  const handleDeleteClick = async () => {
    try {
      const deletedPost = await deletePost(singlePost.id);
      console.log('Post deleted:', deletedPost);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="single-post" key={singlePost.id}>
      <div className="single-post__container">
        <div className="single-post__title-wrapper">
          <h2 className="single-post__title">{singlePost.title}</h2>
          <div className="single-post__date">
            {formatCreatedAt(singlePost.created_at)}
          </div>
        </div>
        <div className="single-post__post">
          <img
            src={singlePost.img}
            alt="postImg"
            className="single-post__img"
          />
          <div className="single-post__author">
            <div className="single-post__username-and-feature">
              <p className="single-post__username">{singlePost.username}</p>
              {isAuthor && (
                <div className="single-post__options-container">
                  <SlOptions
                    className="single-post__options"
                    onClick={handleOptionsClick}
                  />
                  {isMenuOpen && (
                    <div className="single-post__options-menu">
                      <button
                        onClick={handleEditClick}
                        className="single-post__options-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="single-post__options-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="single-post__likes">
              <p className="single-post__num-like">{singlePost.likes}</p>
              <IoHeart className="single-post__like-icon" />
            </div>
          </div>
          <div
            className="single-post__desc"
            dangerouslySetInnerHTML={{
              __html: getTextWithHTML(singlePost.desc),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
