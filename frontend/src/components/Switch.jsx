import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../actions/uiActions";

const Switch = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const dispatch = useDispatch();

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  const onClickHandler = () => {
    // document.documentElement.classList.toggle("dark");
    dispatch(changeTheme(!darkModeOn));
    setDarkModeOn((prevValue) => !prevValue);
  };

  useEffect(() => {
    setDarkModeOn(darkMode);
    dispatch(changeTheme(darkMode));
  });
  return (
    <div className={`switch-holder ${darkModeOn && "on"}`} id="switch-holder">
      <div onClick={onClickHandler} className="button" id="button"></div>
    </div>
  );
};

export default Switch;
