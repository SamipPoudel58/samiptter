import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <div style={{ cursor: "pointer" }} onClick={history.goBack}>
      <i className="fas fa-arrow-left"></i>
    </div>
  );
};

export default BackButton;
