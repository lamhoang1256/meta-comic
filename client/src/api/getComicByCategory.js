import axios from "axios";
import { parse } from "node-html-parser";

export const getComicByCategory = async (url) => {
  let allComic;
  try {
    const page = await axios.get(url);
    const data = page.data;
    const DOM = parse(data);
    const items = DOM.querySelectorAll("#ctl00_divCenter .item");
    allComic = items.map((comic) => {
      const comicName = comic.querySelector(".jtip").innerText;
      const urlOriginal = comic
        .querySelector(".jtip")
        .getAttribute("href")
        .replace(`${process.env.REACT_APP_API}/truyen-tranh`, "detail");
      const index = urlOriginal.lastIndexOf("-");
      const comicHref = urlOriginal.substring(0, index);
      const comicUrlImg = comic
        .querySelector(".image img")
        .getAttribute("data-original")
        .replace("//", "http://");
      //get all count love and format 1.030.234 -> 1030234
      const comicCountLove = comic
        .querySelector(".pull-left .fa-heart")
        .parentNode.childNodes[[6]]._rawText.replaceAll(".", "");
      //get all count view and format 1.030.234 -> 1030234
      const comicCountView = comic
        .querySelector(".pull-left .fa-eye")
        .parentNode.childNodes[[2]]._rawText.replaceAll(".", "");
      const comicChapter = comic.querySelector(".chapter a").innerText;
      const comicTimeago = comic.querySelector(".chapter .time").innerText;
      return {
        comicName,
        comicHref,
        comicUrlImg,
        comicCountLove,
        comicCountView,
        comicChapter,
        comicTimeago,
      };
    });
  } catch (err) {
    console.log(err);
  }
  return allComic;
};
