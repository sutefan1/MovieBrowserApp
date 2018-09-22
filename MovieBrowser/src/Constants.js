import ApiKey from "./ApiKey";

export const ROOT_URL = {
  API: `https://api.themoviedb.org/3`,
  IMAGE: "https://image.tmdb.org/t/p/w780"
};
export const API_ENDPOINT = {
  MOVIE: `/movie`,
  TVSHOW: "/tv",
  DISCOVER: "/discover"
};

export const TYPE_SHOW = "show";
export const TYPE_MOVIE = "movie";

export const COLOR = { BACKGROUND: "#1a1a1a", NAVBAR: "#111" };

export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10
  },
  shadowOpacity: 0.53,
  shadowRadius: 13.97,

  elevation: 21
};

export const KEY_EXTRACTOR = (item, index) => "" + index;
