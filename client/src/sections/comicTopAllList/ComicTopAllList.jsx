import React, { useState, useEffect, useRef } from "react";
import ComicItem from "../../components/comicItem/ComicItem";
import { getComicByCategory } from "../../api/getComicByCategory";
import ComicItemSkeleton from "../../components/comicItem/ComicItemSkeleton";

export default function ComicTopAllList() {
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(false);
  const comicListElement = useRef();

  const baseUrl = `${process.env.REACT_APP_API}/hot`;
  //function get all list TOP comics
  const fetchData = async () => {
    try {
      const responseData = await getComicByCategory(baseUrl);
      setIsLoading(false);
      setComics(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  //get data
  useEffect(() => {
    if (loadmore) {
      setIsLoading(true);
      fetchData();
    }
  }, [baseUrl, loadmore]);
  //load skeleton if api get data is loading
  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setLoadmore(true);
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(comicListElement.current);
    }
  }, [isLoading]);

  return (
    <>
      <h3 className='text-label'>Truyện hot nhất (Hot Comic)</h3>
      <div className='comic-list' ref={comicListElement}>
        {/* fetch data  */}
        {!isLoading &&
          comics &&
          comics.map((comic, index) => {
            return (
              <ComicItem
                key={index}
                comicName={comic.comicName}
                comicUrlImg={comic.comicUrlImg}
                comicCountLove={comic.comicCountLove}
                comicCountView={comic.comicCountView}
                comicChapter={comic.comicChapter}
                comicTimeago={comic.comicTimeago}
                comicHref={comic.comicHref}
              ></ComicItem>
            );
          })}
        {/* load skeleton */}
        {isLoading && (
          <>
            <ComicItemSkeleton></ComicItemSkeleton>
            <ComicItemSkeleton></ComicItemSkeleton>
            <ComicItemSkeleton></ComicItemSkeleton>
            <ComicItemSkeleton></ComicItemSkeleton>
            <ComicItemSkeleton></ComicItemSkeleton>
            <ComicItemSkeleton></ComicItemSkeleton>
          </>
        )}
      </div>
    </>
  );
}
