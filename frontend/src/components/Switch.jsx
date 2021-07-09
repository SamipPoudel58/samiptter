import React, { useState } from "react";

const Switch = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);

  const onClickHandler = () => {
    document.documentElement.classList.toggle("dark");
    setDarkModeOn((prevValue) => !prevValue);
  };
  return (
    <div className={`switch-holder ${darkModeOn && "on"}`} id="switch-holder">
      <div onClick={onClickHandler} className="button" id="button"></div>
    </div>
  );
};

export default Switch;
