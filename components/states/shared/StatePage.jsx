import React from "react";
import LanguageSelector from "../../LanguageSelector";
import BackButton from "./BackButton";

const StatePage = (props) => {
  return (
    <div className="flex flex-col items-center mb-8 w-8/12 md:w-full">
      <div className="w-full mr-8 pb-5 md:flex md:flex-row  md:justify-between md:w-10/12 md:ml-48 ">
        <BackButton labelStyle={{ fontSize: "200%" }} />
        <LanguageSelector />
      </div>

      <div className="flex  flex-col items-center mt-10">{props.children}</div>
    </div>
  );
};

export default StatePage;
