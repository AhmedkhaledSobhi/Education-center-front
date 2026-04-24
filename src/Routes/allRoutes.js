import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import Teacher from "../pages/Users/Teacher/Teacher";
import Assistant from "../pages/Users/Assistant/Assistant";
import AddTeacher from "../pages/Users/Teacher/AddTeacher";
import Student from "../pages/Users/Student/Student";
import AddStudent from "../pages/Users/Student/AddStudent";
import UserSettings from "../pages/UserAccount/UserSettings";
import ProfileAccount from "../pages/UserAccount/ProfileAccount";
import Section from "../pages/Setting/Section/Section";
import AddSection from "../pages/Setting/Section/AddSection";
import Branches from "../pages/Setting/Branches/Branches";
import AddBranche from "../pages/Setting/Branches/AddBranche";
import Subjects from "../pages/Setting/Subjects/Subjects";
import AddSubject from "../pages/Setting/Subjects/AddSubject";
import PreviewSubject from "../pages/Setting/Subjects/PreviewSubject";
import PreviewSection from "../pages/Setting/Section/PreviewSection";

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
  },
  {
    path: "/section",
    component: <Section/>,
    moduleName: "Section"
  },
  {
    path: "/addSection",
    component: <AddSection/>,
    moduleName: "Section"
  },
  {
    path: "/PreviewSection/:id",
    component: <PreviewSection/>,
    moduleName: "Section"
  },
  {
    path: "/branches",
    component: <Branches/>,
    moduleName: "Branches"
  },
  {
    path: "/addBranche",
    component: <AddBranche/>,
    moduleName: "Branches"
  },
  {
    path: "/subjects",
    component: <Subjects/>,
    moduleName: "Subjects"
  },
  {
    path: "/addSubject",
    component: <AddSubject/>,
    moduleName: "Subjects"
  },
  {
    path: "/previewSubject/:id",
    component: <PreviewSubject/>,
    moduleName: "Subjects"
  }
]


export {accessableRoutes, publicRoutes, authProtectedRoutes}