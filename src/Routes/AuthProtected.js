import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, } from "react-router-dom";
import axios from "axios";
import { useProfile } from "../Components/Hooks/UserHooks";
import configService from "../helpers/config";
import { performLogoutCleanup } from "../helpers/logoutCleanup";

const AuthProtected = (props) => {
  // const ctx = useContext(CartContext);
  const { userProfile } = useProfile();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  let [tryCount, setTryCount] = useState(0);

  const getPgeInfo = async () => {
    try {
      const BASE_URL = configService.apiBaseUrl;
      const res = await axios.get(`${BASE_URL}pages/all`);
      // ctx.setPageInfo(res?.data);
    } catch (error) {}
  };



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const loginToken = JSON.parse(localStorage.getItem("access_token"));

      if (loginToken) {
        const loginType = localStorage.getItem("loginType") || "admin";
        axios.defaults.headers.common["Authorization"] = `Bearer ${loginToken}`;
        axios.defaults.headers.common["login-type"] = loginType;

        try {
          // Check if we have cached user info and it's not expired
          const cachedUserInfo = localStorage.getItem("userInfo");
          const cachedTimestamp = localStorage.getItem("userInfoTimestamp");
          const currentTime = new Date().getTime();

          // Use cached data if it exists and is less than 30 minutes old          
          if (cachedUserInfo) {
            const parsedUserInfo = JSON.parse(cachedUserInfo);
            setUserData(parsedUserInfo);
            setTokenValid(true);
            // ctx.setProfileData(parsedUserInfo);
            setLoading(false);
            return;
          }
         
        } catch (error) {
          if (error == "Request failed with status code 401") {
            handleUnauthenticated();
          }
        } finally {
          setLoading(false);
        }
      } else if (tryCount >= 2) {
        setLoading(false);
      } else {
        setTryCount(tryCount + 1);
      }
    };

    fetchData();
  }, [tryCount]);

  useEffect(() => {
    if (userProfile) {
      const authUser = JSON.parse(localStorage.getItem("access_token"));
      const token = authUser;
      if (token) {
        const loginType = localStorage.getItem("loginType") || "admin";
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.common["login-type"] = loginType;
      }
    }
  }, [userProfile]);

  const handleUnauthenticated = () => {
    performLogoutCleanup();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div id="status">
          <div
            className="spinner-border text-primary avatar-sm"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if ((!tokenValid || !userData) && !loading) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
