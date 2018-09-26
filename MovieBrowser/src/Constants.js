import ApiKey from "./ApiKey";

export const ROOT_URL = {
  API: `https://api.themoviedb.org/3`,
  IMAGE: "https://image.tmdb.org/t/p/w780"
};
export const API_ENDPOINT = {
  MOVIE: `/movie`,
  TVSHOW: "/tv",
  DISCOVER: "/discover",
  SEARCH: "/search",
  GENRE_MOVIE_LIST: "/genre/movie/list",
  GENRE_TVSHOW_LIST: "/genre/tv/list"
};

export const TYPE_SHOW_DISCOVER = "show";
export const TYPE_GENRE_SHOW = "show";
export const TYPE_MOVIE_DISCOVER = "movie";
export const TYPE_GENRE_MOVIE = "movie";

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

export const ASYNCSTORAGE_KEYS = {
  GENRE_MOVIE_LIST: "genres_movie",
  GENRE_TVSHOW_LIST: "genres_tv"
};

export const KEY_EXTRACTOR = (item, index) => "" + index;

export const CAPITALIZE_FIRST_LETTER = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
