import React from "react";

const CardComponent = (props) => {
  return (
    <div
      className="py-6 px-12 bg-white flex flex-col hover:bg-sky-600 hover:scale-105 cursor-pointer rounded-xl shadow-lg border-2 border-black"
      onClick={props.onClick}
    >
      {props.icon}
      <span className="text-xl font-semibold">{props.text}</span>
    </div>
  );
};

export default CardComponent;
