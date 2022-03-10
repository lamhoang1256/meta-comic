import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./comicItem.scss";

export default function ComicItemSkeleton() {
  return (
    // template Skeleton loading for Comic Item in HomePage
    <div className='comic-item'>
      <div className='comic-thumbnail'>
        <Skeleton height={240}></Skeleton>
      </div>
      <h3 className='comic-name'>
        <Skeleton height={40}></Skeleton>
      </h3>
      <div className='comic-rate'>
        <div className='comic-favorite'>
          <Skeleton width={70} height={10}></Skeleton>
        </div>
        <div className='comic-view'>
          <Skeleton width={70} height={10}></Skeleton>
        </div>
      </div>
      <div className='comic-info'>
        <div className='comic-chapter'>
          <Skeleton width={70} height={10}></Skeleton>
        </div>
        <div className='comic-timeago'>
          <Skeleton width={70} height={10}></Skeleton>
        </div>
      </div>
    </div>
  );
}
