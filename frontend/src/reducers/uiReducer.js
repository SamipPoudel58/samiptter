import { CHANGE_THEME } from "../constants/uiConstants";

export const uiThemeReducer = (state = { darkMode: false }, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { darkMode: action.payload };
    default:
      return state;
  }
};
