import EgImg from '../../assets/images/5.png';
import { IoHeart } from 'react-icons/io5';
function PostDetail() {
  return (
    <div className="single-post">
      <div className="single-post__container">
        <div className="single-post__title-wrapper">
          <h2 className="single-post__title">Example Title</h2>

          <div className="single-post__date">2024.11.18</div>
        </div>
        <div className="single-post__post">
          <img src={EgImg} alt="postImg" className="single-post__img" />
          <div className="single-post__author">
            <p className="single-post__username">username</p>
            <div className="single-post__likes">
              <p className="single-post__num-like">12</p>
              <IoHeart className="single-post__like-icon" />
            </div>
          </div>
          <p className="single-post__desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            doloremque necessitatibus fugiat illo, ipsa cumque quas dolores
            beatae pariatur veritatis totam delectus debitis nulla autem a
            laboriosam natus, eum iure et nemo officiis ullam! Corrupti sint
            quasi, quo earum nobis consequatur corporis exercitationem,
            quibusdam voluptatum similique modi error dolorem, pariatur sit? Sit
            assumenda officiis id quibusdam molestiae tenetur aperiam eaque
            impedit doloribus laudantium aut praesentium similique quidem autem,
            cupiditate quas adipisci illo sed mollitia quaerat nobis excepturi
            placeat? Molestiae fuga veniam quis, tenetur deserunt ea itaque
            molestias nostrum porro asperiores expedita voluptate numquam rerum,
            quod fugiat recusandae laudantium. Quia, inventore!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
