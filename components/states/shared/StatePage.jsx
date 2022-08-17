import React from "react";
import BackButton from "./BackButton";

const StatePage = (props) => {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="w-full"> */}
      {/* <BackButton labelStyle={{ fontSize: "200%" }} /> */}
      {/* </div> */}
      {props.children}
    </div>
  );
};

export default StatePage;
