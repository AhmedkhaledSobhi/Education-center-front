
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

// Teacher
export const createAccountTeacher = (data) =>{  
  return api.create(`${url.REGISTER}`, data, {
    "Content-Type": "application/json",
  });
};
export const getTeacher = (data) => api.get(url.PROFILES, data);
export const editAccountTeacher = (data) =>{  
  const { id, ...rest } = data;
  return api.update(`${url.EDIT_ACCOUNT_INFORMATION}${id}`, 
    rest,
  );
};
export const delete_Teacher = (data) => api.delete(`${url.DELETE_TEACHER}${data.id}`);
// _____________________________________________

// Student
export const createAccountStudent = (data) =>{  
  return api.create(`${url.REGISTER}`, data, {
    "Content-Type": "application/json",
  });
};
export const getStudent = (data) => api.get(url.PROFILES, data);

export const editAccountStudent = (data) =>{  
  const { id, ...rest } = data;
  return api.update(`${url.EDIT_ACCOUNT_INFORMATION}${id}`, 
    rest,
  );
}
// _____________________________________________

// Room
export const createRoom = (data) => api.create(url.ROOM, data)
export const allRoom = (data) => api.get(url.ROOM, data);
export const getRoom = (data) => api.get(`${url.ROOM}/${data.id}`);
export const delete_Room = (data) => api.delete(`${url.DELETE_Room}/${data.id}`);
export const update_Room = (data) =>{
  const { id, ...rest } = data;
  return api.update(`${url.UPDATE_ROOM}/${id}`, rest);
} 

// Course
export const allCourse = (data) => api.get(url.COURSE, data);
export const getCourse = (data) => api.get(`${url.COURSE}/${data.id}`);
export const create_Course = (data) => api.create(url.CREATE_COURSE, data);
export const update_Course = (data) =>{
  const { id, ...rest } = data;
  return api.update(`${url.UPDATE_COURSE}/${id}`, rest);
} 
export const delete_Course = (data) => api.delete(`${url.DELETE_COURSE}/${data.id}`);

// upload-file
export const uploadFiles = (data) => {
  const formData = new FormData();
  formData.append("file", data); // أو "photo" حسب الـ backend

  return api.create(url.UPLOAD_FILE, formData, {
    "Content-Type": "multipart/form-data",
  });
}
