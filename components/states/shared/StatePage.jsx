import React from "react";
import BackButton from "./BackButton";
const StatePage = (props) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-12 mx-5 md:mt-32 space-y-8 md:space-y-12 w-full md:w-3/5">
        <div className="w-full">
          {/* <BackButton labelStyle={{ fontSize: "200%" }} /> */}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default StatePage;
