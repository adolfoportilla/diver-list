import React from "react";
import Image from "next/image";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const sizes = ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];

const FinsCard = ({
  finSelectVisible,
  finSize,
  setFinSize,
  setFinSelectVisible,
}) => {
  return (
    <div>
      {!finSelectVisible ? (
        <CardComponent
          icon={<Image src="/icons/fins.svg" alt="" width={150} height={150} />}
          text={finSize ? finSize : "Fins"}
          onClick={() => setFinSelectVisible(!finSelectVisible)}
          style={{ backgroundColor: `${finSize ? "#90EE90" : ""}` }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setFinSize}
              label="Size"
              options={sizes}
            />
          }
          text="Select Size"
          onClick={() => setFinSelectVisible(!finSelectVisible)}
        />
      )}
    </div>
  );
};

export default FinsCard;
