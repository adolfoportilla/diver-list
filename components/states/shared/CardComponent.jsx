import React from "react";

const CardComponent = (props) => {
  console.log(props.margin);
  return (
    <div
      className={
        "md:py-8 w-52 h-48 md:w-60 md:h-56  bg-white flex flex-col items-center justify-center hover:border-sky-600 hover:shadow-xl cursor-pointer rounded-xl shadow-lg border-2 border-black" +
        " " +
        props.additionalClassName
      }
      onClick={props.onClick}
      style={props.style}
    >
      <div className="flex items-center justify-center h-28 w-28 md:w-56 md:h-56">
        <div className={`max-h-18 max-w-18 ${props.iconClassName}`}>
          {props.icon}
        </div>
      </div>
      <div className="h-9 flex items-end ">
        <span className="font-medium ">{props.text}</span>
      </div>
    </div>
  );
};

export default CardComponent;
