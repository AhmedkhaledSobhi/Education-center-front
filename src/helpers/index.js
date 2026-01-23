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
export {
  hasEmptyValue,
  checkModuleExists,
  checkUserRoles,
}