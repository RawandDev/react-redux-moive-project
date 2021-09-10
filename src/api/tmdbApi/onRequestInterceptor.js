/* eslint-disable no-param-reassign */
import { API_KEY } from "./apiInfo";

export const onSuccessRequest = (config) => {
  const queryParams = [];
  queryParams.push(`api_key=${API_KEY}`);
  if (config.genre) {
    queryParams.push(`with_genres=${config.genre}`);
  }
  if (config.page && config.page >= 1 && config.page <= 500) {
    queryParams.push(`page=${config.page}`);
  }
  if (typeof config.query === "string") {
    queryParams.push(`query=${config.query.split(" ").join("+")}`);
  }
  config.url += `?${queryParams.join("&")}`;
  console.log(config.url);
  return config;
};

export const onFailedRequest = (error) => Promise.reject(error);
