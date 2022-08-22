import Image from "next/image";
import React from "react";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const sizes = ["small", "medium", "large"];

const BCDCard = ({
  bcdSelectVisible,
  bcdSize,
  setBcdSize,
  setBcdSelectVisible,
}) => {
  return (
    <div>
      {!bcdSelectVisible ? (
        <CardComponent
          icon={
            <Image
              src="/icons/diving-suit.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={bcdSize ? bcdSize : "BCD"}
          onClick={() => setBcdSelectVisible(!bcdSelectVisible)}
          style={{ backgroundColor: `${bcdSize ? "#90EE90" : ""}` }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setBcdSize}
              label="Size"
              options={sizes}
            />
          }
          text="Select Size"
          onClick={() => setBcdSelectVisible(!bcdSelectVisible)}
        />
      )}
    </div>
  );
};

export default BCDCard;
