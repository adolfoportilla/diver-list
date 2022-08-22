import React from "react";
import Image from "next/image";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const sizes = ["80 (normal)", "100 (large)"];

const TankCard = ({
  tankSelectVisible,
  tankSize,
  setTankSize,
  setTankSelectVisible,
}) => {
  return (
    <div>
      {!tankSelectVisible ? (
        <CardComponent
          icon={
            <Image
              src="/icons/oxygen-tank.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={tankSize ? tankSize : "Tank"}
          onClick={() => setTankSelectVisible(!tankSelectVisible)}
          style={{ backgroundColor: `${tankSize ? "#90EE90" : ""}` }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setTankSize}
              label="Size"
              options={sizes}
            />
          }
          text="Select Size"
          onClick={() => setTankSelectVisible(!tankSelectVisible)}
        />
      )}
    </div>
  );
};

export default TankCard;
