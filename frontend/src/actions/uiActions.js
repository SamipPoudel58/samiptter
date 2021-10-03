import { CHANGE_THEME } from "../constants/uiConstants";

export const changeTheme = (theme) => async (dispatch) => {
  // TODO: add to local storage
  localStorage.setItem("darkModeOn", JSON.stringify(theme));
  dispatch({
    type: CHANGE_THEME,
    payload: theme,
  });
};
