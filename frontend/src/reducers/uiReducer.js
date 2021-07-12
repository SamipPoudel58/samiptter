export const uiThemeReducer = (state = { darkMode: false }, action) => {
  switch (action.payload) {
    case "CHANGE_THEME":
      return { darkMode: action.payload };
    default:
      return state;
  }
};
