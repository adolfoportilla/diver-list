import React from "react";

const CardComponent = (props) => {
  return (
    <div
      className="md:py-8 w-52 h-48 md:w-60 md:h-56  bg-white flex flex-col items-center justify-center hover:border-sky-500 hover:shadow-xl cursor-pointer rounded-xl shadow-lg border-2 border-black"
      onClick={props.onClick}
    >
      <div className="flex items-center justify-center h-28 w-28 md:w-56 md:h-56">
        {props.icon}
      </div>
      <span className="text-xl font-semibold hover:text-sky-300">
        {props.text}
      </span>
    </div>
  );
};

export default CardComponent;
