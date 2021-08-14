import axios from "axios";
import cheerio from "cheerio";
import { companyImg } from "../../data/data";

export const getSearchRank = async () => {
  const response = await axios.get(`https://www.hsmoa.com/`).then((html) => {
    let searchArray = [];

    const $ = cheerio.load(html.data);
    const bodyList = $("#realtime_block > div.realtime-rank");
    console.log("bodyList : ", bodyList);

    bodyList.each(function (i, elem) {
      console.log($(this).text());
      let object = {
        word: $(this)
          .children("a")
          .children("div")
          .children("div")
          .children("div")
          .text(),
      };
    });
  });

  return response;
};
