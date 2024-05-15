import { SearchResult } from "@/app/utils/types";

export const sortByOrder = (order: string, results: SearchResult[]) => {
  switch (order) {
    case "Relevance":
      return results.sort((a, b) => {
        return b.score - a.score;
      });
      break;
    case "Price":
      return results.sort((a, b) => {
        const getLowPrice = (priceRange: string | undefined) => {
          if (priceRange === undefined || priceRange === "价格待定")
            return 10000000;
          const price = priceRange.split("-");
          return parseFloat(price[0]);
        };
        const priceA = getLowPrice(a.priceRange),
          priceB = getLowPrice(b.priceRange);
        if (priceA === priceB) {
          return b.score - a.score;
        } else {
          return priceA - priceB;
        }
      });
      break;
    case "Date":
      return results.sort((a, b) => {
        const getLeftDate = (date: string | undefined) => {
          if (date === undefined) return new Date("2070-01-01");
          // get YYYY.MM.DD
          return new Date(date.slice(0, 10));
        };
        const dateA = getLeftDate(a.date),
          dateB = getLeftDate(b.date);
        if (dateA === dateB) {
          return b.score - a.score;
        } else {
          return dateA.getTime() - dateB.getTime();
        }
      });
      break;
    case "Rating":
      return results.sort((a, b) => {
        const ratingA = a.rating === undefined ? 0 : a.rating,
          ratingB = b.rating === undefined ? 0 : b.rating;
        if (ratingA === ratingB) {
          return b.score - a.score;
        } else {
          return ratingB - ratingA;
        }
      });
      break;
  }
  return results;
};
