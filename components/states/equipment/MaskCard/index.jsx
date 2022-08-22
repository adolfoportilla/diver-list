import Image from "next/image";
import React from "react";
import CardComponent from "../../shared/CardComponent";
import SelectComponent from "../../shared/SelectComponent";

const choices = ["Yes", "No"];

const MaskCard = ({
  maskSelectVisible,
  maskChoice,
  setMaskChoice,
  setMaskSelectVisible,
}) => {
  return (
    <div>
      {!maskSelectVisible ? (
        <CardComponent
          icon={
            <Image
              src="/icons/diving-mask.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text={maskChoice ? maskChoice : "Mask"}
          onClick={() => setMaskSelectVisible(!maskSelectVisible)}
          style={{
            backgroundColor: `${maskChoice ? "#90EE90" : ""}`,
          }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setMaskChoice}
              label="Size"
              options={choices}
            />
          }
          text="Select Size"
          onClick={() => setMaskSelectVisible(!maskSelectVisible)}
        />
      )}
    </div>
  );
};

export default MaskCard;
