import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComicDetail } from "../../api/getComicDetail";
import ComicHeaderDetail from "../../sections/comicHeaderDetail/ComicHeaderDetail";
import ComicListChapter from "../../sections/comicListChapter/ComicListChapter";
import Header from "../../components/header/Header";
import "./comicDetail.scss";
import ComicHeaderDetailSkeleton from "../../sections/comicHeaderDetail/ComicHeaderDetailSkeleton";
import Skeleton from "react-loading-skeleton";

export default function ComicDetail() {
  const { nameComic } = useParams();
  const [comicDetail, setComicDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const URL = `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}`;
  //function get data form URL
  const fetchComicDetail = async () => {
    try {
      const responseData = await getComicDetail(URL);
      setComicDetail(responseData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchComicDetail();
  }, [URL]);

  return (
    <>
      <Header></Header>
      <div className='container'>
        <div className='comicDetail-main'>
          <div className='breadcum'>
            <span>Trang chủ / </span>
            <span>Danh sách truyện / </span>
            <span>Tổng tài tại thượng </span>
          </div>

          {/* load comic infomation if has data get form API */}
          {!isLoading && comicDetail && <ComicHeaderDetail data={comicDetail}></ComicHeaderDetail>}

          {/* load skeleton if call API get data is running */}
          {isLoading && <ComicHeaderDetailSkeleton></ComicHeaderDetailSkeleton>}

          <h2 className='comicDetail-heading'>Nội dung</h2>
          <div className='comicDetail-desc'>
            {isLoading && <Skeleton height={120}></Skeleton>}
            <p>{comicDetail && comicDetail.descDetail}</p>
          </div>

          <h2 className='comicDetail-heading'>Danh sách chương</h2>
          {isLoading && <Skeleton height={200}></Skeleton>}

          {comicDetail && (
            <ComicListChapter listComic={comicDetail.listComicDetail}></ComicListChapter>
          )}
        </div>
      </div>
    </>
  );
}
