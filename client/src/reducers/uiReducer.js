import {
  CHANGE_THEME,
  CLOSE_PREVIEW,
  PREVIEW_IMAGE,
} from "../constants/uiConstants";

export const uiThemeReducer = (state = { darkMode: false }, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { darkMode: action.payload };
    default:
      return state;
  }
};

export const previewReducer = (
  state = { previewSrc: "", previewType: "cover" },
  action
) => {
  switch (action.type) {
    case PREVIEW_IMAGE:
      return {
        previewSrc: action.payload.src,
        previewType: action.payload.type,
      };
    case CLOSE_PREVIEW:
      return { previewSrc: "", previewType: "cover" };
    default:
      return state;
  }
};
