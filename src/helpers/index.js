import { performLogoutCleanup } from "./logoutCleanup";

const handleUnauthenticated = () => {
  performLogoutCleanup();
  window.location.href = "/Home";
};

function hasEmptyValue(obj) {
  return Object.values(obj).some(
    (val) =>
      val === null ||
      val === undefined ||
      val === "" ||
      (typeof val === "object" && Object.keys(val).length === 0)
  );
}

const checkModuleExists = (moduleName, mainAdmin) => {
  if (mainAdmin) {
    return true;
  } else {
    let exists = false;
    if (window.localStorage.role) {
      const userRoles = JSON.parse(window.localStorage.role)?.role?.permissions;
      userRoles?.forEach((permission) => {
        if (permission.module === moduleName) {
          exists = true;
        }
      });
    }

    return exists;
  }
};
const checkUserRoles = (moduleName, permissionName, mainAdmin) => {
  if (mainAdmin) {
    return true;
  } else {
    let enabled = false;
    
    if (window.localStorage.role) {
      const userRoles = JSON.parse(window.localStorage.role)?.role?.permissions;
      userRoles?.forEach((permission) => {
        if (
          permission.module === moduleName &&
          permission.name === permissionName
        ) {
          enabled = true;
        }
      });
    }

    return enabled;
  }
};

const isEmpty = (value) => {
  if (value == null) return true;
  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
const safeParse = (value) => {
  try {
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};
export {
  handleUnauthenticated,
  hasEmptyValue,
  checkModuleExists,
  checkUserRoles,
  isEmpty,
  safeParse,
}