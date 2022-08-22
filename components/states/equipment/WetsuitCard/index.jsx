import Image from "next/image";
import React from "react";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const sizes = ["small", "medium", "large"];

const WetsuitCard = ({
  wetsuitSelectVisible,
  wetSuitSize,
  setWetsuitSize,
  setWetsuitSelectVisible,
}) => {
  return (
    <div>
      {!wetsuitSelectVisible ? (
        <CardComponent
          icon={
            <Image src="/icons/wetsuit.svg" alt="" width={150} height={150} />
          }
          text={wetSuitSize ? wetSuitSize : "Wetsuit"}
          onClick={() => setWetsuitSelectVisible(!wetsuitSelectVisible)}
          style={{ backgroundColor: `${wetSuitSize ? "#90EE90" : ""}` }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setWetsuitSize}
              label="Size"
              options={sizes}
            />
          }
          text="Select Size"
          onClick={() => setWetsuitSelectVisible(!wetsuitSelectVisible)}
        />
      )}
    </div>
  );
};

export default WetsuitCard;
