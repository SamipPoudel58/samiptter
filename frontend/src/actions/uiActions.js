export const changeTheme = (theme) => async (dispatch) => {
  if (theme === false) {
    localStorage.setItem("darkModeOn", true);
  } else {
    localStorage.setItem("darkModeOn", true);
    dispatch({
      type: "CHANGE_THEME",
      payload: theme,
    });
  }
};
