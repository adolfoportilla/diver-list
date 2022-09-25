import React from "react";

export default function StatePage(props) {
  return (
    <div className="w-screen max-w-full h-full">
      <div className="flex justify-center">
        <div className="flex flex-col items-center mt-12 md:mt-6 mx-5 md:mx-0 space-y-8 md:space-y-12 w-full md:w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}
