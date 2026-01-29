
import configService from "./config";
import * as url from "./url_helper";
import { APIClient } from "./api_helper";

const api = new APIClient();


const authUser = JSON.parse(localStorage.getItem("authUser"));
const idUser = authUser?.id
// console.log("ahmed idUser", idUser);
// console.log("ahmed authUser", authUser);

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
export const editAccountInformation = (data) => api.update(`${url.EDIT_ACCOUNT_INFORMATION}${idUser}`, data);