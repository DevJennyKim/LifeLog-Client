import './Comments.scss';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';
import { useState } from 'react';
import { addComment, deleteComment } from '../../api/api';
import Swal from 'sweetalert2';

function Comments({ comments, currentUser, singlePost, setComments }) {
  const [openMenu, setOpenMenu] = useState({});
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleOptionsClick = (commentId) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const handleEditClick = () => {
    console.log('Editing post...');
  };
  const handleDeleteClick = async (commentId) => {
    try {
      const response = await deleteComment(singlePost.id, commentId);

      if (response.message === 'Comment deleted successfully') {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        alert('deleted!');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }
    try {
      const response = await addComment(
        singlePost.id,
        currentUser.id,
        newComment
      );
      if (response.commentId) {
        comments.push({
          id: response.commentId,
          username: currentUser.name,
          comment: newComment,
          created_at: new Date(),
        });
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  return (
    <div className="comments">
      <form onSubmit={handleSubmit} className="comments__form">
        <input
          type="text"
          className="comments__input"
          placeholder="Got something to say? Type here!"
          name="comment"
          value={newComment}
          onChange={handleCommentChange}
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
                          onClick={() => handleOptionsClick(comment.id)}
                        />
                        {openMenu[comment.id] && (
                          <div className="comments__options-menu">
                            <button
                              onClick={handleEditClick}
                              className="comments__options-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(comment.id)}
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
