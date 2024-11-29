import './Comments.scss';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';
import { useState } from 'react';

function Comments({ comments, currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionsClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleEditClick = () => {
    console.log('Editing post...');
  };
  const handleDeleteClick = () => {
    console.log('Deleting post...');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="comments">
      <form onSubmit={handleSubmit} className="comments__form">
        <input
          type="text"
          className="comments__input"
          placeholder="Got something to say? Type here!"
          name="comment"
        />
        <button type="submit" className="comments__submit">
          Comment
        </button>
      </form>
      <div className="comments__list">
        <h3 className="comments__title">
          {' '}
          {comments && typeof comments !== 'string'
            ? `${comments.length} Comments`
            : '0 Comments'}
        </h3>
        {typeof comments === 'string' ? (
          <div className="comments__no-comment">{comments}</div>
        ) : (
          comments.map((comment) => {
            const isAuthor = currentUser?.name === comment.username;
            return (
              <div className="comments__item" key={comment.id}>
                <div className="comments__author">
                  <div className="comments__username-and-feature">
                    <p className="comments__username">{comment.username}</p>
                    {isAuthor && (
                      <div className="comments__options-container">
                        <SlOptions
                          className="comments__options"
                          onClick={handleOptionsClick}
                        />
                        {isMenuOpen && (
                          <div className="comments__options-menu">
                            <button
                              onClick={handleEditClick}
                              className="comments__options-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={handleDeleteClick}
                              className="comments__options-btn"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="comments__created-at">
                    {formatCreatedAt(comment.created_at)}
                  </p>
                </div>
                <p className="comments__comment">{comment.comment}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Comments;
