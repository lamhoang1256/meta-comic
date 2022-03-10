import axios from "axios";
import { parse } from "node-html-parser";

export const getComicDetail = async (url) => {
  let dataComicDetail;
  try {
    const page = await axios.get(url);
    const data = page.data;
    const DOM = parse(data);
    const titleDetail = DOM.querySelector("#item-detail .title-detail").innerText;
    const imageDetail = DOM.querySelector("#item-detail .detail-info .col-image img").getAttribute(
      "src"
    );
    const authorDetail = DOM.querySelector("#item-detail .detail-info .author .col-xs-8").innerText;
    const typeDetail = DOM.querySelectorAll("#item-detail .detail-info .kind .col-xs-8 a");
    const viewElement =
      DOM.querySelectorAll("#item-detail .detail-info .list-info .row")[4] ||
      DOM.querySelectorAll("#item-detail .detail-info .list-info .row")[3];
    const viewDetail = viewElement.querySelector(".col-xs-8").innerText;
    const statusDetail = DOM.querySelector("#item-detail .detail-info .status .col-xs-8").innerText;
    const ratingDetail = DOM.querySelector("#item-detail .detail-info .star").getAttribute(
      "data-rating"
    );
    const descDetail = DOM.querySelector("#item-detail .detail-content p").innerText;
    const listComicDetail = DOM.querySelectorAll(
      "#item-detail .list-chapter nav ul li:not(.heading)"
    );
    return {
      titleDetail,
      imageDetail,
      authorDetail,
      typeDetail,
      statusDetail,
      viewDetail,
      ratingDetail,
      descDetail,
      listComicDetail,
    };
  } catch (err) {
    console.log(err);
  }
  return dataComicDetail;
};
