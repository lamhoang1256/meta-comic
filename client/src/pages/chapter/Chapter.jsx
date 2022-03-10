import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapterComic, getInfoChapterComic, getListSelect } from "../../api/getChapter";
import Header from "../../components/header/Header";
import "./chapter.scss";
import loadingAnimation from "../../assets/loading.gif";
import Dropdown from "../../components/dropdown/Dropdown";

export default function Chapter() {
  //router
  const { nameComic, chapId, hashId } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState();
  const [infoChapter, setInfoChapter] = useState();
  const [allListChap, setAllListChap] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const listOptionOfSelect = useRef();

  //get index of Chapter is viewing
  let indexChap;
  if (allListChap) {
    indexChap = allListChap.findIndex((chap) => {
      const item = chap.getAttribute("href");
      return item === `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}/${chapId}/${hashId}`;
    });
  }

  //**********   GET DATA FORM API  **********
  //get all info (name comic, num chapter ,update time comic ,list chapter use for control change chap ...)
  useEffect(() => {
    const fetchInfoChapter = async () => {
      try {
        // setIsLoading(true);
        const allInfo = await getInfoChapterComic(
          `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}/${chapId}/${hashId}`,
          `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}`
        );
        setInfoChapter(allInfo);
        // setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfoChapter();
  }, [nameComic, chapId, hashId]);

  //get all images comic
  useEffect(() => {
    const fetchChapterComic = async () => {
      try {
        setIsLoading(true);
        //get all src imgs
        const allSrcImgs = await getChapterComic(
          `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}/${chapId}/${hashId}`
        );
        //convert all image to base64 with api
        const responseData = await axios.post(`${process.env.REACT_APP_BE}/get-images`, {
          urls: allSrcImgs,
          origin: process.env.REACT_APP_API,
        });
        await setChapters(responseData.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChapterComic();
  }, [nameComic, indexChap, chapId, hashId]);

  //get all list chapter use for select option chap
  useEffect(() => {
    const fetchListSelectChap = async () => {
      try {
        const allList = await getListSelect(
          `${process.env.REACT_APP_API}/truyen-tranh/${nameComic}`
        );
        setAllListChap(allList);
        listOptionOfSelect.current = allList;
      } catch (err) {
        console.log(err);
      }
    };
    fetchListSelectChap();
  }, []);
  //**********  END GET DATA FORM API  **********

  //change chapter when use option of select
  const handleChangeSelect = (selectedOption) => {
    navigate(selectedOption.value.replace(`${process.env.REACT_APP_API}/truyen-tranh`, "/detail"));
  };

  //next chap
  const handleNextChap = () => {
    indexChap--;
    navigate(
      allListChap[indexChap]
        .getAttribute("href")
        .replace(`${process.env.REACT_APP_API}/truyen-tranh`, "/detail")
    );
  };

  //prev chap
  const handlePrevChap = () => {
    indexChap++;
    navigate(
      allListChap[indexChap]
        .getAttribute("href")
        .replace(`${process.env.REACT_APP_API}/truyen-tranh`, "/detail")
    );
  };

  return (
    <div className='chapter'>
      <Header></Header>

      <div className='container'>
        <div className='chapter-header'>
          <div className='chapter-info'>
            <div className='chapter-basic'>
              <h2 className='chapter-name'>{infoChapter && infoChapter.nameChapter}</h2>
              <h2 className='chapter-num'>{infoChapter && infoChapter.numChapter}</h2>
            </div>
            <div className='chapter-update'>{infoChapter && infoChapter.updateChapter}</div>
          </div>
          <div className='chapter-control'>
            <button className='chapter-prev chapter-button' onClick={handlePrevChap}>
              <ion-icon name='chevron-back-outline'></ion-icon> Prev
            </button>

            {/* react-select use for change chap */}
            {listOptionOfSelect.current && (
              <Dropdown
                listOptionOfSelect={listOptionOfSelect}
                eventOnChange={handleChangeSelect}
                indexChap={indexChap}
              ></Dropdown>
            )}

            <button className='chapter-prev chapter-button' onClick={handleNextChap}>
              Next <ion-icon name='chevron-forward-outline'></ion-icon>
            </button>
          </div>
        </div>
        {/* load all images or animation loading */}
        <div className='readingDetail'>
          {isLoading ? (
            <img src={loadingAnimation} width={150} style={{ margin: "0 auto" }} alt='' />
          ) : (
            chapters &&
            chapters.map((chapter, index) => {
              return (
                <div key={index}>
                  <img src={chapter.url} alt='' />
                </div>
              );
            })
          )}
        </div>

        {isLoading ? (
          " "
        ) : (
          <div className='chapter-bottom'>
            <div className='chapter-control'>
              <button className='chapter-prev chapter-button' onClick={handlePrevChap}>
                <ion-icon name='chevron-back-outline'></ion-icon> Prev
              </button>

              {/* react-select use for change chap */}
              {listOptionOfSelect.current && (
                <Dropdown
                  listOptionOfSelect={listOptionOfSelect}
                  eventOnChange={handleChangeSelect}
                  indexChap={indexChap}
                ></Dropdown>
              )}

              <button className='chapter-prev chapter-button' onClick={handleNextChap}>
                Next <ion-icon name='chevron-forward-outline'></ion-icon>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
