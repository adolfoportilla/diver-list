import React from "react";
import LanguageSelector from "../../LanguageSelector";
import BackButton from "./BackButton";

const StatePage = (props) => {
  return (
    <div className="flex flex-col items-center mb-8 w-full md:w-10/12 md:w-full  ">
      <div className="w-full mr-8 pb-5 flex flex-row  justify-between md:w-full md:ml-32 ">
        <BackButton labelStyle={{ fontSize: "200%" }} />
        <LanguageSelector />
      </div>

      <div className="flex  flex-col items-center mt-10">{props.children}</div>
    </div>
  );
};

export default StatePage;
