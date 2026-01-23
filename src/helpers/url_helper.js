// register
export const REGISTER = "auth/register";
// login
export const LOGIN = "auth/login";
// Profile
const authUser = JSON.parse(localStorage.getItem("authUser"));
const idUser = authUser?.id
export const PROFILE = `auth/`;
// Edit Account Information
export const EDIT_ACCOUNT_INFORMATION = `auth/${idUser}`;
