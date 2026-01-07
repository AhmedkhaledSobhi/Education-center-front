import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
]

const accessableRoutes = [
  // { path: "*", component: <Navigate to="/Home" /> },
  { path: "*", component: <Navigate to="/register" /> },
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
]

export {accessableRoutes, publicRoutes, authProtectedRoutes}