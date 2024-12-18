import './Comments.scss';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';
import { useState } from 'react';
import { addComment, deleteComment, updateComment } from '../../api/api';
import Swal from 'sweetalert2';

function Comments({
  comments,
  currentUser,
  singlePost,
  setComments,
  fetchComments,
}) {
  const [openMenu, setOpenMenu] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComments, setEditedComments] = useState({});

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleOptionsClick = (commentId) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedComments((prevState) => ({
      ...prevState,
      [commentId]: commentText,
    }));
    setOpenMenu((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
  };
  const handleCommentEditChange = (commentId, e) => {
    setEditedComments((prevState) => ({
      ...prevState,
      [commentId]: e.target.value,
    }));
  };

  const handleSaveEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCommentText = editedComments[editingCommentId];

      const response = await updateComment(
        singlePost.id,
        editingCommentId,
        updatedCommentText
      );
      if (response && response.message === 'Comment updated successfully') {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, comment: updatedCommentText }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditedComments((prevState) => {
          const newState = { ...prevState };
          delete newState[editingCommentId];
          return newState;
        });
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteClick = async (commentId) => {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Delete',
        text: 'Do you really want to delete your post?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cancel`,
        customClass: {
          popup: 'single-post__alert',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteComment(singlePost.id, commentId);
          if (response.message === 'Comment deleted successfully') {
            fetchComments();
          }
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
          });
        }
      });
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
        const newCommentObject = {
          id: response.commentId,
          username: currentUser.name,
          comment: newComment,
          created_at: new Date(),
        };
        setComments((prevComments) => {
          if (typeof prevComments === 'string') {
            const firstComment = [newCommentObject];
            return firstComment;
          } else {
            const updatedComments = [newCommentObject, ...prevComments];
            return updatedComments.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
          }
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
          value={newComment || ''}
          onChange={handleCommentChange}
        />
        <button type="submit" className="comments__submit">
          Comment
        </button>
      </form>
      <div className="comments__list">
        <h3 className="comments__title">
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
                              onClick={() =>
                                handleEditClick(comment.id, comment.comment)
                              }
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
                {editingCommentId === comment.id ? (
                  <form
                    className="comments__edit-container"
                    onSubmit={handleSaveEditSubmit}
                  >
                    <input
                      type="text"
                      className="comments__input"
                      value={editedComments[comment.id] || ''}
                      onChange={(e) => handleCommentEditChange(comment.id, e)}
                    />
                    <button type="submit" className="comments__submit">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="comments__cancel"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <p className="comments__comment">{comment.comment}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Comments;
