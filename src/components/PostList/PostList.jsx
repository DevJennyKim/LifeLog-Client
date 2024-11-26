import { Link } from 'react-router-dom';
import postImgEg from '../../assets/images/6.png';
function PostList() {
  return (
    <Link to="/post-detail/:id" className="posts__item-link">
      <div className="posts__item">
        <img src={postImgEg} alt="postImgEG" className="posts__item-img" />
        <div className="posts__item-content">
          <h1 className="posts__item-title">
            Dinner with Friends at a Cozy ...
          </h1>
          <p className="posts__item-p">
            Last night, my friends and I gathered at this charming little
            restaurant downtown. The ambiance was warm and inviting, with soft
            lighting and lovely music in the background...
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostList;
