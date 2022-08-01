import React from "react";

const StateCards = (props) => {
  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 space-x-0 md:space-x-16 mt-8 md:mt-16">
      {props.children}
    </div>
  );
};

export default StateCards;
