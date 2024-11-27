import { IoHeart } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import formatCreatedAt from '../../utils/dateUtils';

function PostDetail({ singlePost }) {
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
              <SlOptions className="single-post__options" />
            </div>
            <div className="single-post__likes">
              <p className="single-post__num-like">{singlePost.likes}</p>
              <IoHeart className="single-post__like-icon" />
            </div>
          </div>
          <p className="single-post__desc">{singlePost.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
