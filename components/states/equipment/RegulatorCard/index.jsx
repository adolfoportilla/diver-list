import Image from "next/image";
import React from "react";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const choices = ["Yes", "No"];

const RegulatorCard = ({
  regulatorSelectVisible,
  regulatorChoice,
  setRegulatorChoice,
  setRegulatorSelectVisible,
}) => {
  return (
    <div>
      {!regulatorSelectVisible ? (
        <CardComponent
          icon={
            <Image src="/icons/regulator.svg" alt="" width={150} height={150} />
          }
          text={regulatorChoice ? regulatorChoice : "Regulator"}
          onClick={() => setRegulatorSelectVisible(!regulatorSelectVisible)}
          style={{
            backgroundColor: `${regulatorChoice ? "#90EE90" : ""}`,
          }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setRegulatorChoice}
              label="Size"
              options={choices}
            />
          }
          text="Select Size"
          onClick={() => setRegulatorSelectVisible(!regulatorSelectVisible)}
        />
      )}
    </div>
  );
};

export default RegulatorCard;
