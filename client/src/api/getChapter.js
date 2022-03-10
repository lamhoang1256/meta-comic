import axios from "axios";
import { parse } from "node-html-parser";

export const getChapterComic = async (URL) => {
  let srcImgsChapter = [];
  try {
    const page = await axios.get(URL);
    const data = page.data;
    const DOM = parse(data);
    //get all img element after push imgs src to srcImgsChapter
    const imagesChapter = DOM.querySelectorAll(".reading .reading-detail .page-chapter img");
    imagesChapter.forEach((item, index) => {
      const srcImg = item.getAttribute("src").startsWith("//")
        ? item.getAttribute("src").replace("//", "http://")
        : item.getAttribute("src");
      srcImgsChapter.push(srcImg);
    });
  } catch (err) {
    srcImgsChapter.log(err);
  }
  return srcImgsChapter;
};

export const getInfoChapterComic = async (URL) => {
  let infoChapter;
  try {
    // DOM 1 use to load images comic
    const page = await axios.get(URL);
    const data = page.data;
    const DOM = parse(data);
    const nameChapter = DOM.querySelector(".top .txt-primary > a").innerText;
    const numChapter = DOM.querySelector(".top .txt-primary > span").innerText.replace("- ", "");
    const updateChapter = DOM.querySelector(".top > i").innerText;

    // const nextURL = DOM.querySelector(".reading .reading-control .next").getAttribute("href");

    infoChapter = { nameChapter, numChapter, updateChapter };
  } catch (err) {
    console.log(err);
  }
  return infoChapter;
};

export const getListSelect = async (URL2) => {
  let listComicChapter;
  try {
    // DOM 2 use to get list chapter use for control change chap
    const page2 = await axios.get(URL2);
    const data2 = page2.data;
    const DOM2 = parse(data2);
    listComicChapter = DOM2.querySelectorAll(
      "#item-detail .list-chapter nav ul li:not(.heading) a"
    );
  } catch (err) {
    console.log(err);
  }
  return listComicChapter;
};
