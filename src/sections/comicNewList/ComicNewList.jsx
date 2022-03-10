import React, { useEffect, useState } from "react";
import ComicItem from "../../components/comicItem/ComicItem";
import { getComicByCategory } from "../../api/getComicByCategory";
import ComicItemSkeleton from "../../components/comicItem/ComicItemSkeleton";

export default function ComicNewList() {
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API;
  //get all NEW comic
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const responseData = await getComicByCategory(baseUrl);
        setIsLoading(false);
        setComics(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [baseUrl]);

  return (
    <>
      <h3 className='text-label'>Truyện mới cập nhật (New Comic)</h3>
      <div className='comic-list'>
        {/* fetch data */}
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
