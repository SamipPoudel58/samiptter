import React from "react";
import { useDispatch } from "react-redux";
import { CLOSE_PREVIEW } from "../constants/uiConstants";

const PreviewImage = ({ src, type }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => dispatch({ type: CLOSE_PREVIEW })}
        className="previewImage__backDrop previewImage__backDrop-dark"
      ></div>
      <span
        onClick={() => dispatch({ type: CLOSE_PREVIEW })}
        className="previewImage__previewClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      <img
        className={`previewImage__popupImage ${
          type === "cover"
            ? "previewImage__popupImage-cover"
            : "previewImage__popupImage-profile"
        }`}
        src={src}
        alt="preview"
      />
    </>
  );
};

export default PreviewImage;
