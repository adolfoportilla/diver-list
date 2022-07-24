import React from "react";

const StateTitle = (props) => {
  return (
    <div className="space-between space-y-8">
      <span className="text-5xl">{props.title}</span>
    </div>
  );
};

export default StateTitle;
