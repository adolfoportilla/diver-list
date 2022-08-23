import React from "react";
import Image from "next/image";
import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";

const EquipmentCard = ({ choice, setChoice, icon, text, options }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      {!visible ? (
        <CardComponent
          icon={<Image src={icon} alt="" width={150} height={150} />}
          text={choice ? choice : text}
          onClick={() => setVisible(!visible)}
          style={{ backgroundColor: `${choice ? "#90EE90" : ""}` }}
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              setValue={setChoice}
              label="Options"
              options={options}
            />
          }
          text="Select Choice"
          onClick={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

export default EquipmentCard;
