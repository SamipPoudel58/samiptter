import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div className={`alert ${variant}`}>
      <i className="fas fa-exclamation-circle"></i>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
