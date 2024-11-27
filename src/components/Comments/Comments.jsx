import './Comments.scss';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';

function Comments({ comments }) {
  return (
    <div className="comments">
      <form action="" className="comments__form">
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
          comments.map((comment) => (
            <div className="comments__item" key={comment.id}>
              <div className="comments__author">
                <div className="comments__username-and-feature">
                  <p className="comments__username">{comment.username}</p>
                  <SlOptions className="comments__options" />
                </div>
                <p className="comments__created-at">
                  {formatCreatedAt(comment.created_at)}
                </p>
              </div>
              <p className="comments__comment">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
