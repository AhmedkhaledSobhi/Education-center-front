// Simple action creators that produce payloads handled by the store's
// reducer (which responds to the "SET_LAYOUT" action).
export const changeLayout = (value) => ({
  type: "SET_LAYOUT",
  payload: { layoutType: value },
});

export const changeSidebarTheme = (value) => ({
  type: "SET_LAYOUT",
  payload: { leftSidebarType: value },
});

export const changeLayoutMode = (value) => ({
  type: "SET_LAYOUT",
  payload: { layoutModeType: value },
});

export const changeLayoutWidth = (value) => ({
  type: "SET_LAYOUT",
  payload: { layoutWidthType: value },
});

export const changeLayoutPosition = (value) => ({
  type: "SET_LAYOUT",
  payload: { layoutPositionType: value },
});

export const changeTopbarTheme = (value) => ({
  type: "SET_LAYOUT",
  payload: { topbarThemeType: value },
});

export const changeLeftsidebarSizeType = (value) => ({
  type: "SET_LAYOUT",
  payload: { leftsidbarSizeType: value },
});

export const changeLeftsidebarViewType = (value) => ({
  type: "SET_LAYOUT",
  payload: { leftSidebarViewType: value },
});

export const changeSidebarImageType = (value) => ({
  type: "SET_LAYOUT",
  payload: { leftSidebarImageType: value },
});

export const changePreLoader = (value) => ({
  type: "SET_LAYOUT",
  payload: { preloader: value },
});

export const changeSidebarVisibility = (value) => ({
  type: "SET_LAYOUT",
  payload: { sidebarVisibilitytype: value },
});

export const resetValue = () => ({
  type: "SET_LAYOUT",
  payload: {},
});
