import React from "react";
import "./comicHeaderDetail.scss";

export default function ComicHeaderDetail(props) {
  const {
    titleDetail,
    imageDetail,
    authorDetail,
    typeDetail,
    statusDetail,
    viewDetail,
    ratingDetail,
  } = props.data;
  return (
    <div className='comicDetail-header'>
      <div className='comicDetail-name'>{titleDetail}</div>
      <div className='comicDetail-container'>
        <div className='comicDetail-thumb'>
          <img src={imageDetail} alt='' />
        </div>
        <div className='comicDetail-content'>
          <div className='comicDetail-author'>
            <h3>Tác giả : </h3> <span className='label'>{authorDetail}</span>
          </div>
          <div className='comicDetail-type'>
            <h3>Thể loại : </h3>
            {typeDetail.map((label, index) => {
              return (
                <span className='label' key={index}>
                  {label.innerText}
                </span>
              );
            })}
          </div>
          <div className='comicDetail-status'>
            <h3>Tình trạng : </h3>
            <span className='label completed'>{statusDetail}</span>
          </div>
          <div className='comicDetail-view'>
            <h3>Lượt xem : </h3> <div className='label'>{viewDetail}</div>
          </div>
          <div className='comicDetail-score'>
            <h3>Đánh giá : </h3>
            <div className='rating'>
              <ion-icon className='rating-star' name='star'></ion-icon>
              <ion-icon className='rating-star' name='star'></ion-icon>
              <ion-icon className='rating-star' name='star'></ion-icon>
              <ion-icon className='rating-star' name='star'></ion-icon>
              <ion-icon className='rating-star' name='star'></ion-icon>
            </div>
            <h4>
              <span>{ratingDetail}</span>/5
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
