import React from "react";
import StateTitle from "../states/shared/StateTitle";

export default function SignUpPage(props) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <StateTitle title={props.title} />
      </div>
      {props.children}
    </div>
  );
}
