import React from "react";
import { MyContext } from "./ReservationController";
import { Button } from "antd";

const LanguageButton = ({ language, contextValue }) => {
  const context = React.useContext(MyContext);
  return (
    <Button
      className="px-2 py-1 border"
      onClick={() => context.setLanguage(contextValue)}
    >
      {language}
    </Button>
  );
};

const LanguageSelector = () => {
  return (
    <div className="space-x-1">
      <LanguageButton language="English" contextValue="english" />
      <LanguageButton language="Español" contextValue="spanish" />
    </div>
  );
};

export default LanguageSelector;
