// register
export const REGISTER = "auth/register";
// login
export const LOGIN = "auth/login";

// Profile
export const PROFILES = `auth/`;

// Edit Account Information
const authUser = JSON.parse(localStorage.getItem("authUser"));
const idUser = authUser?.id

export const EDIT_ACCOUNT_INFORMATION = `user/idUser`;
