import React, { useState, useEffect } from "react";

const Toast = ({ variant, children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000);
  });

  return (
    <div className={`toast ${variant} ${visible && "visible"}`}>
      <i className="fas fa-exclamation-circle"></i>
      {children}
    </div>
  );
};

Toast.defaultProps = {
  variant: "info",
};

export default Toast;
