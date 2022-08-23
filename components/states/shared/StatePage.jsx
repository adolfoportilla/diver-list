import React from "react";
import BackButton from "./BackButton";

const StatePage = (props) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-full mr-8 md:mr-28">
        <BackButton labelStyle={{ fontSize: "200%" }} />
      </div>
      {props.children}
    </div>
  );
};

export default StatePage;
