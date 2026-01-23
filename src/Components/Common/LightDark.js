import React from "react";

//constants
import {
  layoutModeTypes,
  leftSidebarTypes,
} from "../../Components/constants/layout";
import { useDispatch } from "react-redux";
import { changeSidebarTheme } from "../../slices/thunks";

const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
  const dispatch = useDispatch();
  const mode =
    layoutMode === layoutModeTypes["DARKMODE"]
      ? layoutModeTypes["LIGHTMODE"]
      : layoutModeTypes["DARKMODE"];

  return (
    <div className="ms-1 header-item d-none d-sm-flex">
      <button
        onClick={() => {
          onChangeLayoutMode(mode);
          dispatch(
            changeSidebarTheme(
              leftSidebarTypes.DARK == "dark" ? "dark" : "light"
            )
          );
        }}
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
      >
        <i className="bx bx-moon fs-22"></i>
      </button>
    </div>
  );
};

export default LightDark;
