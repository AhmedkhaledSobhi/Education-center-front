
import configService from "./config";
import * as url from "./url_helper";
import { APIClient } from "./api_helper";

const api = new APIClient();

export const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

/* =====================
  APIs
===================== */

// profile api
export const profile = (data) => api.get(url.PROFILES, data);
export const allUser = (data) => api.get(url.ALLUSERS, data);

export const editAccountInformation = (data) =>{
  const user = getLoggedInUser();
  return api.update(`${url.EDIT_ACCOUNT_INFORMATION}${user?.id}`, 
    data,
  );
}

// _____________________________________________

export const createRoom = (data) => {
  api.create(url.ROOM, data)
}
export const allRoom = (data) => api.get(url.ROOM, data);

// Course
export const allCourse = (data) => api.get(url.COURSE, data);

// upload-file
export const uploadFiles = (data) => {
  const formData = new FormData();
  formData.append("file", data); // أو "photo" حسب الـ backend

  return api.create(url.UPLOAD_FILE, formData, {
    "Content-Type": "multipart/form-data",
  });
}
