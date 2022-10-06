import { CHANGE_THEME, PREVIEW_IMAGE } from "../constants/uiConstants";

export const changeTheme = (theme) => async (dispatch) => {
  // TODO: add to local storage
  localStorage.setItem("darkModeOn", JSON.stringify(theme));
  dispatch({
    type: CHANGE_THEME,
    payload: theme,
  });
};

export const previewImage = (src, type) => async (dispatch) => {
  dispatch({
    type: PREVIEW_IMAGE,
    payload: { src, type },
  });
};
