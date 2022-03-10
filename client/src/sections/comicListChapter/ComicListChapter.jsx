import React from "react";
import { Link } from "react-router-dom";
import "./comicListChapter.scss";

export default function ComicListChapter(props) {
  let { listComic } = props;
  return (
    <div className='comicDetail-boxed'>
      <div className='comicDetail-introduce'>
        <h3>Số chương</h3>
        <h3 className='center'>Cập nhật</h3>
        <h3 className='center'>Lượt xem</h3>
      </div>
      <ul className='comicDetail-list'>
        {listComic.map((comic, index) => {
          const chapter = comic.querySelector(".col-xs-5.chapter").innerText;
          const urlOriginal = comic.querySelector(".col-xs-5.chapter a").getAttribute("href");
          const getChapId = urlOriginal.lastIndexOf("chap-");
          const href = urlOriginal.substring(getChapId);
          const timeago = comic.querySelector(".col-xs-4.small").innerText;
          const countview = comic.querySelector(".col-xs-3.small").innerText;
          return (
            <li className='comicDetail-item' key={index}>
              <Link to={href} className='comicDetail-link'>
                {chapter}
              </Link>
              <div className='comicDetail-timeago'>{timeago}</div>
              <div className='comicDetail-countview'>{countview}</div>
            </li>
          );
        })}

        {/* <li className='comicDetail-item'>
          <a href='#' className='comicDetail-link'>
            Chapter 129
          </a>
          <span className='comicDetail-timeago'>1 giờ trước</span>
        </li> */}
      </ul>
    </div>
  );
}
