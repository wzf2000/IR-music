import { SearchResult, CityType } from "@/app/utils/types";

const getPriceRange = (priceRange: string | undefined) => {
  if (!priceRange || priceRange === "价格待定" || priceRange === "待定") {
    return [10000000, 10000000];
  }
  const pattern1 = /^([\d]+[\.]?[\d]*)-([\d]+[\.]?[\d]*)$/;
  if (pattern1.test(priceRange)) {
    const priceString = pattern1.exec(priceRange);
    return [parseFloat(priceString ? priceString[1] : "10000000"), parseFloat(priceString ? priceString[2] : "10000000")];
  }
  const pattern2 = /^([\d]+[\.]?[\d]*)$/;
  if (pattern2.test(priceRange)) {
    const price = parseFloat(priceRange);
    return [price, price];
  }
  return [10000000, 10000000];
};

export const sortByOrder = (results: SearchResult[], order: string) => {
  switch (order) {
    case "Relevance":
      return results.sort((a, b) => {
        return b.score - a.score;
      });
      break;
    case "Price":
      return results.sort((a, b) => {
        const priceA = getPriceRange(a.priceRange)[0],
          priceB = getPriceRange(b.priceRange)[0];
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
          if (date === undefined || date === "时间待定") return new Date("99999-12-31");
          // get YYYY.MM.DD
          const pattern = /^(\d{4})\.(\d{1,2})\.(\d{1,2})/;
          if (pattern.test(date.slice(0, 10))) {
            return new Date(date.slice(0, 10));
          } else if (pattern.test(date.slice(0, 9))) {
            return new Date(date.slice(0, 9));
          } else if (pattern.test(date.slice(0, 8))) {
            return new Date(date.slice(0, 8));
          } else {
            return new Date("9999-12-31");
          }
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

const checkDate = (date: Date, startDate: Date | null, endDate: Date | null) => {
  return (
    (startDate === null || date >= startDate) &&
    (endDate === null || date <= endDate)
  );
};

const checkDateRange = (date1: Date, date2: Date, startDate: Date | null, endDate: Date | null) => {
  return (
    (startDate === null && endDate !== null && date1 <= endDate) ||
    (endDate === null && startDate !== null && date2 >= startDate) ||
    (startDate !== null && endDate !== null && date1 <= endDate && date2 >= startDate)
  );
}

export const filterByCity = (results: SearchResult[], city: CityType) => {
  if (city.label === "所有城市") {
    return results;
  }
  return results.filter((result) => {
    return result.city === city.label;
  });
}

export const filterByDate = (results: SearchResult[], startDate: Date | null, endDate: Date | null) => {
  const noLimit = startDate === null && endDate === null;
  if (startDate === null && endDate === null) {
    // default to today
    const now = new Date(); 
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startDate = today;
  }
  return results.filter((result) => {
    if (noLimit && (result.date === "时间待定" || !result.date)) return true;
    if (result.date === "时间待定" || !result.date) return false;
    // pattern1 YYYY.mM.dD 周[一二三四五六日]
    const pattern1 = /^(\d{4})\.(\d{1,2})\.(\d{1,2}) 周[一二三四五六日]$/;
    // pattern2 YYYY.MM.DD 周[一二三四五六日] HH:MM
    const pattern2 = /^(\d{4})\.(\d{2})\.(\d{2}) 周[一二三四五六日] (\d{2}):(\d{2})$/;
    // pattern3 YYYY.mM.dD hH:mM 周[一二三四五六日]
    const pattern3 = /^(\d{4})\.(\d{1,2})\.(\d{1,2}) (\d{1,2}):(\d{1,2}) 周[一二三四五六日]$/;
    // pattern4 YYYY.mM.dD hH:mM
    const pattern4 = /^(\d{4})\.(\d{1,2})\.(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
    if (pattern1.test(result.date) || pattern2.test(result.date) || pattern3.test(result.date) || pattern4.test(result.date)) {
      const dateString = /^(\d{4})\.(\d{1,2})\.(\d{1,2})/.exec(result.date);
      const date = new Date(dateString ? dateString[0] : "9999-12-31");
      return checkDate(date, startDate, endDate);
    }
    // pattern5 YYYY.MM.DD[-~]YYYY.MM.DD
    const pattern5 = /^(\d{4})[\./](\d{2})[\./](\d{2})[-~](\d{4})[\./](\d{2})[\./](\d{2})$/;
    if (pattern5.test(result.date)) {
      const date1 = new Date(result.date.slice(0, 10)), date2 = new Date(result.date.slice(11, 21));
      return checkDateRange(date1, date2, startDate, endDate);
    }
    // pattern6 YYYY.MM.DD[-~]MM.DD
    const pattern6 = /^(\d{4})\.(\d{2})\.(\d{2})[-~](\d{2})\.(\d{2})$/;
    if (pattern6.test(result.date)) {
      const date1 = new Date(result.date.slice(0, 10)), date2 = new Date(result.date.slice(0, 5) + result.date.slice(11, 16));
      return checkDateRange(date1, date2, startDate, endDate);
    }
    // pattern7 YYYY.mM.dD / mM.dD
    const pattern7 = /^((\d{4}\.)\d{1,2}\.\d{1,2}) \/ (\d{1,2}\.\d{1,2})$/;
    if (pattern7.test(result.date)) {
      const dateString = pattern7.exec(result.date);
      // dateString[1] = YYYY.mM.dD, dateString[2] = YYYY., dateString[3] = mM.dD
      const date1 = new Date(dateString ? dateString[1] : "9999-12-31"), date2 = new Date(dateString ? dateString[2] + dateString[3] : "9999-12-31");
      return checkDate(date1, startDate, endDate) || checkDate(date2, startDate, endDate);
    }
    // pattern8 YYYY.mM.dD - YYYY.mM.dD
    const pattern8 = /^(\d{4}\.\d{1,2}\.\d{1,2}) - (\d{4}\.\d{1,2}\.\d{1,2})$/;
    if (pattern8.test(result.date)) {
      const dateString = pattern8.exec(result.date);
      const date1 = new Date(dateString ? dateString[1] : "9999-12-31"), date2 = new Date(dateString ? dateString[2] : "9999-12-31");
      return checkDateRange(date1, date2, startDate, endDate);
    }
    // pattern9 YYYY.mM.dD - mM.dD
    const pattern9 = /^((\d{4}\.)\d{1,2}\.\d{1,2}) - (\d{1,2}\.\d{1,2})$/;
    if (pattern9.test(result.date)) {
      const dateString = pattern9.exec(result.date);
      const date1 = new Date(dateString ? dateString[1] : "9999-12-31"), date2 = new Date(dateString ? dateString[2] + dateString[3] : "9999-12-31");
      return checkDateRange(date1, date2, startDate, endDate);
    }
    return false;
  });
}

export const filterByPrice = (results: SearchResult[], priceLow: number, priceHigh: number) => {
  return results.filter((result) => {
    const priceRange = getPriceRange(result.priceRange);
    const price1 = priceRange[0], price2 = priceRange[1];
    return price1 <= priceHigh && price2 >= priceLow;
  });
};
