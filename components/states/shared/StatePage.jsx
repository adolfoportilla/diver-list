import React from "react";
const StatePage = (props) => {
  return (
    <div className="h-fit md:h-screen">
      <div className="flex flex-col items-center justify-center mt-12 md:mt-32 space-y-8 md:space-y-12">
        {props.children}
      </div>
    </div>
  );
};

export default StatePage;
