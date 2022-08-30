import React from "react";
import { useActor } from "@xstate/react";
import { MyContext } from "./ReservationController";

const LanguageSelector = () => {
  const context = React.useContext(MyContext);
  const [, send] = useActor(context.service);
  return (
    <div className="p-5 mt-10">
      <button
        className="p-2 border"
        onClick={() => context.setLanguage("english")}
      >
        English
      </button>
      <button
        className="p-2 border"
        onClick={() => context.setLanguage("spanish")}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSelector;
