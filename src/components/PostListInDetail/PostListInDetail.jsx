import EgImg from '../../assets/images/5.png';
function PostListInDetail() {
  return (
    <div className="post-list-in-detail">
      <div className="post-list-in-detail__container">
        <div className="post-list-in-detail__title-container">
          <h1 className="post-list-in-detail__title">Other posts</h1>
        </div>
        <div className="post-list-in-detail__list">
          <div className="post-list-in-detail__item">
            <img
              src={EgImg}
              alt="postListImg"
              className="post-list-in-detail__item-preview"
            />
            <div className="post-list-in-detail__item-content">
              <h2 className="post-list-in-detail__item-title">Example Title</h2>
              <div className="post-list-in-detail__item-author">
                <p className="post-list-in-detail__username">username</p>
                <p className="post-list-in-detail__created-at">2024.11.11</p>
              </div>
            </div>
          </div>
          {/* --------------- */}
          <div className="post-list-in-detail__item">
            <img
              src={EgImg}
              alt="postListImg"
              className="post-list-in-detail__item-preview"
            />
            <div className="post-list-in-detail__item-content">
              <h2 className="post-list-in-detail__item-title">Example Title</h2>
              <div className="post-list-in-detail__item-author">
                <p className="post-list-in-detail__username">username</p>
                <p className="post-list-in-detail__created-at">2024.11.11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListInDetail;
