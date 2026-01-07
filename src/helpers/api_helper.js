import axios from "axios";
import { toast } from "react-toastify";
import configService from "./config";
import { performLogoutCleanup } from "./logoutCleanup";


// Get base URL from config service
const getBaseUrl = () => {
  return configService.apiBaseUrl;
};

// Set initial base URL (will be updated after config loads)
axios.defaults.baseURL = getBaseUrl();


// Function to update axios baseURL after config loads
export const updateAxiosBaseURL = () => {
  axios.defaults.baseURL = getBaseUrl();
};

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// Add login type to default headers
const loginType = localStorage.getItem("loginType") || "admin";
axios.defaults.headers.common["login-type"] = loginType;

// Add request interceptor to handle authorization dynamically
axios.interceptors.request.use(
  (config) => {
    const currentLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("I18N_LANGUAGE") ||
      "ar";

    // headers عامة
    config.headers["Accept-Language"] = currentLanguage;
    config.headers["lang"] = currentLanguage;

    // Remove any existing Authorization header first
    delete config.headers.Authorization;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    if (response?.data?.message == "Unauthenticated.") {
      performLogoutCleanup();
      window.location.href = "/login";
    }
    return response.data ? response.data : response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      // case 401:
      //   message = "Invalid credentials";
      //   localStorage.clear();
      //   window.location.href = "/login";
      //   break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  // Don't set global defaults anymore, let the interceptor handle it
  // axios.defaults.headers.common["Authorization"] = "Bearer " + token

  // Store the token in localStorage so the interceptor can use it
  console.log("ahmed token", token);
  console.log("ahmed authUser", authUser);

  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  authUser.token = token;
  localStorage.setItem("authUser", JSON.stringify(authUser));
};

const setLoginType = (loginType) => {
  axios.defaults.headers.common["login-type"] = loginType || "admin";
  localStorage.setItem("loginType", loginType || "admin");
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = async (url, params) => {
    const currentLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("I18N_LANGUAGE")
        ? localStorage.getItem("i18nextLng") ||
          localStorage.getItem("I18N_LANGUAGE")
        : "ar";
    const loginType = localStorage.getItem("loginType") || "admin";

    // Create headers object (Authorization will be handled by interceptor)
    const headers = {
      lang: currentLanguage,
      "login-type": loginType,
    };

    try {
      const paramKeys = params
        ? Object.keys(params).map((key) => `${key}=${params[key]}`)
        : [];
      const queryString = paramKeys.length ? paramKeys.join("&") : "";
      const response = await axios.get(
        queryString ? `${url}?${queryString}` : url,
        {
          headers: headers,
        }
      );
      if (response?.message === "Unauthenticated") {
        performLogoutCleanup();
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      if (error == "Request failed with status code 401") {
        performLogoutCleanup();
        window.location.href = "/login";
      }
      toast.error(error.message || error);
      throw error;
    }
  };

  /**
   * post given data to url
   */
  create = async (
    url,
    data,
    header = {
      "Content-Type": "application/json",
    }
  ) => {
    const loginType = localStorage.getItem("loginType") || "admin";

    // Create headers object (Authorization will be handled by interceptor)
    const headers = {
      ...header,
      lang:
        localStorage.getItem("i18nextLng") ||
        localStorage.getItem("I18N_LANGUAGE")
          ? localStorage.getItem("i18nextLng") ||
            localStorage.getItem("I18N_LANGUAGE")
          : "ar",
      "login-type": loginType,
    };

    const response = await axios.post(url, data, {
      headers: headers,
    });

    if (response?.message == "Unauthenticated.") {
      performLogoutCleanup();
      window.location.href = "/login";
    }

    // error handling
    try {
      if (response) return response;
    } catch (error) {
      switch (error.status) {
        case 500:
          error = "Internal Server Error";
          break;
        case 401:
          error = "Invalid credentials";
          break;
        case 404:
          error = "Sorry! the data you are looking for could not be found";
          break;
        default:
          error = error.message || error;
      }
      toast.error(error.message || error);
    }
  };


  /**
   * Updates data
   */
  update = (url, data) => {
    const loginType = localStorage.getItem("loginType") || "admin";
    const currentLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("I18N_LANGUAGE") ||
      "ar";

    // Create headers object (Authorization will be handled by interceptor)
    const headers = {
      lang: currentLanguage,
      "login-type": loginType,
    };

    return axios.patch(url, data, {
      headers: headers,
    });
  };

  
  put = (url, data) => {
    const loginType = localStorage.getItem("loginType") || "admin";
    const currentLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("I18N_LANGUAGE") ||
      "ar";

    // Create headers object (Authorization will be handled by interceptor)
    const headers = {
      lang: currentLanguage,
      "login-type": loginType,
    };

    return axios.put(url, data, {
      headers: headers,
    });
  };

  /**
   * Delete
   */
  delete = (url, config) => {
    const loginType = localStorage.getItem("loginType") || "admin";
    const currentLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("I18N_LANGUAGE") ||
      "ar";

    // Create headers object (Authorization will be handled by interceptor)
    const headers = {
      ...config?.headers,
      lang: currentLanguage,
      "login-type": loginType,
    };

    return axios.delete(url, {
      ...config,
      headers: headers,
    });
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, setLoginType, getLoggedinUser };
