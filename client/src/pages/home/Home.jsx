import React from "react";
import Header from "../../components/header/Header";
import ComicNewList from "../../sections/comicNewList/ComicNewList";
import ComicTopAllList from "../../sections/comicTopAllList/ComicTopAllList";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className='container main'>
        <ComicNewList></ComicNewList>
        <ComicTopAllList></ComicTopAllList>
      </div>
    </>
  );
}
