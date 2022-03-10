import React from "react";
import Skeleton from "react-loading-skeleton";
import "./comicHeaderDetail.scss";

export default function ComicHeaderDetailSkeleton() {
  return (
    <div className='comicDetail-header'>
      <div className='comicDetail-name'>
        <Skeleton width={280} height={30}></Skeleton>
      </div>
      <div className='comicDetail-container'>
        <div className='comicDetail-thumb'>
          <Skeleton
            className='skeleton-img'
            width={185}
            height={275}
            borderRadius={8}
            style={{ display: "block", margin: "0 auto", marginTop: 10 }}
          ></Skeleton>
        </div>
        <div className='comicDetail-content'>
          <div className='comicDetail-author'>
            <Skeleton width={220} height={25}></Skeleton>
          </div>
          <div className='comicDetail-type'>
            <Skeleton width={260} height={25}></Skeleton>
          </div>
          <div className='comicDetail-status'>
            <Skeleton width={230} height={25}></Skeleton>
          </div>
          <div className='comicDetail-view'>
            <Skeleton width={210} height={25}></Skeleton>
          </div>
          <div className='comicDetail-score'>
            <Skeleton width={280} height={25}></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
