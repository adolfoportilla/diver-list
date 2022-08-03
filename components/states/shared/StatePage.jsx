import React from "react";
const StatePage = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 mx-5 md:mt-32 space-y-8 md:space-y-12">
      {props.children}
    </div>
  );
};

export default StatePage;
