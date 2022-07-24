import React from "react";
const StatePage = (props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-16 mb-80">
        {props.children}
      </div>
    </div>
  );
};

export default StatePage;
