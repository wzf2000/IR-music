import { SearchResult } from "./types";

const exists = (data: any) => {
  if (data === undefined || data === null || data === "" || data === "nan") {
    return false;
  }
  return true;
}

const parse_music = (data: any) => {
  let searchResultList: SearchResult[] = [];
  data.hits.hits.forEach((val: any) => {
    let platform = val._source.platform;
    let source = val._source.detailViewComponentMap;
    let item = source.item;
    let searchResult: SearchResult = {
      platform: platform,
      title: item.staticData.itemBase.itemName,
      category:
        "演唱会" in item.staticData.itemBase ? "演唱会" : "音乐节",
      image: item.staticData.itemBase.itemPic,
      date: item.staticData.itemBase.showTime,
      city: item.staticData.itemBase.cityName,
      hot: item.staticData.itemBase.isHotProject == 'true',
      score: val._score,
    };
    if ("dynamicData" in item && "artists" in item.dynamicData) {
      let artists = item.dynamicData.artists;
      // get the first 3 artists or less
      let moreThanThree = artists.length > 3;
      artists = artists.slice(0, 3);
      // get the artistName of each artist
      artists = artists.map((artist: any) => artist.artistName);
      searchResult.artists = artists.join("，");
      if (moreThanThree) {
        searchResult.artists += "等";
      }
    } else if ("dynamicExtData" in item && "artists" in item.dynamicExtData) {
      let artists = item.dynamicExtData.artists;
      // get the first 3 artists or less
      let moreThanThree = artists.length > 3;
      artists = artists.slice(0, 3);
      // get the artistName of each artist
      artists = artists.map((artist: any) => artist.artistName);
      searchResult.artists = artists.join("，");
      if (moreThanThree) {
        searchResult.artists += "等";
      }
    }
    if (searchResult.artists === "") {
      searchResult.artists = "群星";
    }
    if ("venue" in item.staticData) {
      searchResult.address =
        item.staticData.venue.venueAddr +
        " " +
        item.staticData.venue.venueName;
      if (
        "lng" in item.staticData.venue &&
        "lat" in item.staticData.venue
      ) {
        searchResult.lng = item.staticData.venue.lng;
        searchResult.lat = item.staticData.venue.lat;
      }
    }
    if ("rating" in item.staticData) {
      searchResult.rating = Number(
        item.staticData.rating.rating
      );
    }
    if ("item" in item && "priceRange" in item.item) {
      searchResult.priceRange = item.item.priceRange;
    }
    searchResultList.push(searchResult);
  });
  return searchResultList;
};

export const parse = (data: any) => {
  let searchResultList: SearchResult[] = [];
  data.hits.hits.forEach((val: any) => {
    let source = val._source;
    let platform = source.platform;
    let searchResult: SearchResult = {
      platform: platform,
      title: source.project_name,
      category: source.category_name,
      image: source.project_imgs[0],
      date: source.show_time,
      city: source.city_name,
      hot: source.isHotProject == 'true',
      generalAgent: source.isGeneralAgent == 'true',
      score: val._score,
    };
    let artists = source.artists;
    // get the first 3 artists or less
    let moreThanThree = artists.length > 3;
    artists = artists.slice(0, 3);
    searchResult.artists = artists.join("，");
    if (moreThanThree) {
      searchResult.artists += "等";
    }
    if (searchResult.artists === "") {
      searchResult.artists = "群星";
    }
    if (exists(source.venue_name) && exists(source.venue_info.venue_address)) {
      searchResult.address = source.venue_info.venue_address + " " + source.venue_name;
    }
    if (exists(source.venue_info.lng) && exists(source.venue_info.lat)) {
      searchResult.lng = Number(source.venue_info.lng);
      searchResult.lat = Number(source.venue_info.lat);
    }
    if (exists(source.rating)) {
      searchResult.rating = Number(source.rating);
    }
    if (!exists(source.price)) {
      searchResult.priceRange = '价格待定';
    } else {
      searchResult.priceRange = source.price;
    }
    if (exists(source.wantVO.wantNumStr) && exists(source.wantVO.wantNumSuffix)) {
      searchResult.wantNum = source.wantVO.wantNumStr;
      searchResult.wantNumSuffix = source.wantVO.wantNumSuffix;
    }
    if (exists(source.wantVO.wantDesc)) {
      searchResult.wantDesc = source.wantVO.wantDesc;
    }
    searchResultList.push(searchResult);
  });
  return searchResultList;
};
