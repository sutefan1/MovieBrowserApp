import axios from "axios";
import _ from "lodash";
import { AsyncStorage } from "react-native";
import * as Constants from "./Constants";
import ApiKey from "./ApiKey";

export const GetMovieById = async id => {
  const movieResponse = await axios.get(
    Constants.ROOT_URL.API +
      Constants.API_ENDPOINT.MOVIE +
      "/" +
      id +
      "?" +
      ApiKey
  );
  return movieResponse;
};

export const GetTVShowById = async id => {
  const showResponse = await axios.get(
    Constants.ROOT_URL.API +
      Constants.API_ENDPOINT.TVSHOW +
      "/" +
      id +
      "?" +
      ApiKey
  );
  return showResponse;
};

export const DiscoverMoviesByPopularity = async (page = 1, genre) => {
  let url =
    Constants.ROOT_URL.API +
    Constants.API_ENDPOINT.DISCOVER +
    Constants.API_ENDPOINT.MOVIE +
    "?" +
    ApiKey +
    "&" +
    "page=" +
    page;
  if (genre) {
    url += "&" + "with_genres=" + genre;
  }
  const movieResponse = await axios.get(url);
  return movieResponse;
};

export const DiscoverShowsByPopularity = async (page = 1, genre) => {
  let url =
    Constants.ROOT_URL.API +
    Constants.API_ENDPOINT.DISCOVER +
    Constants.API_ENDPOINT.TVSHOW +
    "?" +
    ApiKey +
    "&" +
    "page=" +
    page;
  if (genre) {
    url += "&" + "with_genres=" + genre;
  }
  const showResponse = await axios.get(url);
  return showResponse;
};

export const GetImageByPath = async path => {
  return await axios.get(Constants.ROOT_URL.IMAGE + path);
};

export const GetGenreList = async isMovie => {
  let genreResponse;
  if (isMovie) {
    genreResponse = await axios.get(
      Constants.ROOT_URL.API +
        Constants.API_ENDPOINT.GENRE_MOVIE_LIST +
        "?" +
        ApiKey
    );
  } else {
    genreResponse = await axios.get(
      Constants.ROOT_URL.API +
        Constants.API_ENDPOINT.GENRE_TVSHOW_LIST +
        "?" +
        ApiKey
    );
  }
  return genreResponse;
};

export const GetGenreNameById = async (id, isMovie = true) => {
  try {
    let genres;
    if (isMovie) {
      genres = JSON.parse(
        await AsyncStorage.getItem(Constants.ASYNCSTORAGE_KEYS.GENRE_MOVIE_LIST)
      );
    } else {
      genres = JSON.parse(
        await AsyncStorage.getItem(
          Constants.ASYNCSTORAGE_KEYS.GENRE_TVSHOW_LIST
        )
      );
    }
    if (genres) {
      const result = _.find(genres, genre => genre.id === id);
      if (result) {
        return result.name;
      } else {
        throw new Error("id not found in records");
      }
    } else {
      throw new Error("no records saved yet");
    }
  } catch (err) {
    try {
      const {
        status,
        data: { genres }
      } = await GetGenreList(isMovie);
      if (status === 200) {
        if (isMovie) {
          await AsyncStorage.setItem(
            Constants.ASYNCSTORAGE_KEYS.GENRE_MOVIE_LIST,
            JSON.stringify(genres)
          );
        } else {
          await AsyncStorage.setItem(
            Constants.ASYNCSTORAGE_KEYS.GENRE_TVSHOW_LIST,
            JSON.stringify(genres)
          );
        }
        const result = _.find(genres, genre => genre.id === id);
        if (result) {
          return result.name;
        } else {
          throw new Error("id not found in newly fetched records");
        }
      }
    } catch (err) {
      return "unknown genre";
    }
  }
};

export const SearchForMovieByName = async (query = "Flash") => {
  let url =
    Constants.ROOT_URL.API +
    Constants.API_ENDPOINT.SEARCH +
    Constants.API_ENDPOINT.MOVIE +
    "?" +
    ApiKey;

  url += "&" + "query=" + query;
  const searchResponse = await axios.get(url);
  return searchResponse;
};

export const SearchForShowByName = async (query = "Flash") => {
  let url =
    Constants.ROOT_URL.API +
    Constants.API_ENDPOINT.SEARCH +
    Constants.API_ENDPOINT.TVSHOW +
    "?" +
    ApiKey;

  url += "&" + "query=" + query;
  const searchResponse = await axios.get(url);
  return searchResponse;
};
