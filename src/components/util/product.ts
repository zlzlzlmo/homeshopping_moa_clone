import axios from "axios";
import cheerio from "cheerio";

export const getProductsFromMoa = async (date: string) => {
  let shoppingList: any[] = [];
  const response = await axios
    .get(`https://www.hsmoa.com/?date=${date}`)
    .then((html) => {
      const $ = cheerio.load(html.data);
      const bodyList = $(".timeline-group > div.timeline-item");
      bodyList.each(function (i, elem) {
        let broadTime = $(this)
          .children("a")
          .children(".display-table")
          .children("div:nth-child(3)")
          .children("span.font-12.c-midgray")
          .text()
          .replace(/(\r\n|\n|\r)/gm, "")
          .replaceAll(" ", "")
          .split("~");
        let object = {
          title: $(this)
            .children("a")
            .children("div.display-table")
            .children("div:nth-child(3)")
            .children("div.font-15")
            .text()
            .trim(),
          image: $(this)
            .children("a")
            .children(".display-table")
            .children("div:nth-child(1)")
            .children("img")
            .attr("data-src"),
          price: $(this)
            .children("a")
            .children(".display-table")
            .children("div:nth-child(3)")
            .children("span.strong.font-17.c-black ")
            .text()
            .trim(),
          time: {
            start: broadTime[0],
            end: broadTime[1],
          },
          // shopping_company: $(this).attr("class").split(" ")[1],
          // category: $(this).attr("class").split(" ")[2],
        };
        shoppingList.push(object);
      });
      return shoppingList;
    });

  return response;
};
