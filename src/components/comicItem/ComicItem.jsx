import React from "react";
import { Link } from "react-router-dom";
import "./comicItem.scss";

export default function ComicItem(props) {
  const {
    comicName,
    comicHref,
    comicUrlImg,
    comicCountLove,
    comicCountView,
    comicChapter,
    comicTimeago,
  } = props;

  function numFormatter(num) {
    num = Number(num);
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num > 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"; // convert to M for number from > 1 billion
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  return (
    <div className='comic-item'>
      <div className='comic-thumbnail'>
        <img src={comicUrlImg ? comicUrlImg : "./images/anh-hung-tro-lai.jpg"} alt='' />
      </div>
      <h3 className='comic-name'>
        <Link to={comicHref ? comicHref : ""}>{comicName ? comicName : "Title"}</Link>
      </h3>
      <div className='comic-rate'>
        <div className='comic-favorite'>
          <ion-icon name='heart'></ion-icon>
          <span>{comicCountLove ? numFormatter(comicCountLove) : "Tim"}</span>
        </div>
        <div className='comic-view'>
          <ion-icon name='eye-outline'></ion-icon>
          <span>{comicCountView ? numFormatter(comicCountView) : "View"}</span>
        </div>
      </div>
      <div className='comic-info'>
        <div className='comic-chapter'>{comicChapter ? comicChapter : "Chapter 124"}</div>
        <div className='comic-timeago'>{comicTimeago ? comicTimeago : "10 phút trước"}</div>
      </div>
    </div>
  );
}
