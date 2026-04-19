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
const cleanParams = (params) => {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== null && params[key] !== undefined && params[key] !== ""
    )
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});
};

const safeParse = (value) => {
  try {
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const getChangedValues = (values, initialValues) => {
  const changed = {};

  Object.keys(values).forEach((key) => {
    const newValue = values[key];
    const oldValue = initialValues[key];

    // لو object (زي select)
    if (typeof newValue === "object" && newValue !== null) {
      const newVal = newValue?.value ?? newValue?.id ?? newValue;
      const oldVal = oldValue?.value ?? oldValue?.id ?? oldValue;

      if (newVal !== oldVal) {
        changed[key] = newValue;
      }
    } else {
      if (newValue !== oldValue) {
        changed[key] = newValue;
      }
    }
  });

  return changed;
};

const NoChanges =(values, initialValues)=>{
  const clean = (obj) =>
  JSON.stringify(obj, (key, value) =>
    value instanceof File ? "FILE" : value
  );
  return clean(values) === clean(initialValues);
}

export {
  handleUnauthenticated,
  hasEmptyValue,
  checkModuleExists,
  checkUserRoles,
  isEmpty,
  cleanParams,
  safeParse,
  getChangedValues,
  NoChanges,
}