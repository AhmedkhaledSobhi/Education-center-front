// Minimal store implementation to satisfy react-redux Provider and hooks
const initialLayoutState = {
  layoutType: "vertical",
  leftSidebarType: "default",
  layoutModeType: "light",
  layoutWidthType: "fluid",
  layoutPositionType: "fixed",
  topbarThemeType: "light",
  leftsidbarSizeType: "default",
  leftSidebarViewType: "default",
  leftSidebarImageType: false,
  preloader: false,
  sidebarVisibilitytype: true,
};

const initialState = {
  Layout: initialLayoutState,
};

function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_LAYOUT":
      return {
        ...state,
        Layout: {
          ...state.Layout,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

function createStore(reducer) {
  let state = reducer(undefined, {});
  const listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((l) => l());
      return action;
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        const idx = listeners.indexOf(listener);
        if (idx > -1) listeners.splice(idx, 1);
      };
    },
  };
}

const store = createStore(rootReducer);

export default store;
