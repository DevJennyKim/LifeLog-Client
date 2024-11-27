import './Comments.scss';

function Comments() {
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
        <h3 className="comments__title">3 Comments</h3>
        <div className="comments__item-container">
          <div className="comments__item">
            <div className="comments__author">
              <p className="comments__username">username</p>
              <p className="comments__created-at">2024.11.18</p>
            </div>
            <p className="comments__item-comment">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
              quis debitis accusantium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
