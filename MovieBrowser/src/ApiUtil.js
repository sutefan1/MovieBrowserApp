import axios from "axios";
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

export const DiscoverMoviesByPopularity = async (page = 1) => {
  const movieResponse = await axios.get(
    Constants.ROOT_URL.API +
      Constants.API_ENDPOINT.DISCOVER +
      Constants.API_ENDPOINT.MOVIE +
      "?" +
      ApiKey +
      "&" +
      page
  );
  return movieResponse;
};

export const DiscoverShowsByPopularity = async (page = 1) => {
  const showResponse = await axios.get(
    Constants.ROOT_URL.API +
      Constants.API_ENDPOINT.DISCOVER +
      Constants.API_ENDPOINT.TVSHOW +
      "?" +
      ApiKey +
      "&" +
      page
  );
  return showResponse;
};

export const GetImageByPath = async path => {
  return await axios.get(Constants.ROOT_URL.IMAGE + path);
};
