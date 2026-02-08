import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import Student from "../pages/Student/Student";
import Teacher from "../pages/Teacher/Teacher";
import UserSettings from "../pages/UserAccount/UserSettings";
import ProfileAccount from "../pages/UserAccount/ProfileAccount";
import Assistant from "../pages/Assistant/Assistant";
import AddTeacher from "../pages/Teacher/AddTeacher";
import AddStudent from "../pages/Student/AddStudent";

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
]

const accessableRoutes = [
  { path: "*", component: <Navigate to="/Home" /> },
  { path: "/profile", component: <ProfileAccount/> },
  { path: "/user-account", component: <UserSettings />, },
]

const authProtectedRoutes = [
  {
    path: "/Home",
    component: <Home />,
    moduleName: "home",
  },
  {
    path: "/",
    exact: true,
    moduleName: "home",
    component: <Navigate to="/Home" />,
  },
  {
    path: "/teacher",
    component: <Teacher/>,
    moduleName: "Teacher"
  },
  {
    path: "/addTeacher",
    component: <AddTeacher/>,
    moduleName: "Teacher"
  },
  {
    path: "/student",
    component: <Student/>,
    moduleName: "Student"
  },
    {
    path: "/addStudent",
    component: <AddStudent/>,
    moduleName: "Teacher"
  },
  {
    path: "/assistant",
    component: <Assistant/>,
    moduleName: "Assistant"
  }
]


export {accessableRoutes, publicRoutes, authProtectedRoutes}