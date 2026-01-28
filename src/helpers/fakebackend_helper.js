
import configService from "./config";
import * as url from "./url_helper";
import { APIClient } from "./api_helper";

const api = new APIClient();

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// profile api
export const profile = (data) => api.get(url.PROFILES, data);
export const editAccountInformation = (data) => api.put(url.EDIT_ACCOUNT_INFORMATION, data);