import React from "react";
import Image from "next/image";
import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";
import { statesText } from "../../../utils/app-text";
import { MyContext } from "../../ReservationController";

const EquipmentCard = ({
  choice,
  setChoice,
  icon,
  text,
  options,
  defaultOption = null,
}) => {
  const [visible, setVisible] = React.useState(false);
  const context = React.useContext(MyContext);

  return (
    <div>
      {!visible ? (
        <CardComponent
          icon={<Image src={icon} alt="" width={150} height={150} />}
          text={
            choice ? (
              <div className="flex flex-col items-center">
                <span>{text}</span>
                <span className="italic text-xs font-normal text-gray-800">
                  {choice}
                </span>
              </div>
            ) : (
              text
            )
          }
          onClick={() => setVisible(!visible)}
          additionalClassName={
            choice
              ? "bg-green-100 border-green-600 hover:border-green-600"
              : null
          }
        />
      ) : (
        <CardComponent
          icon={
            <SelectComponent
              value={choice}
              setValue={setChoice}
              label="Select Size"
              options={options}
              defaultValue={defaultOption}
            />
          }
          text={statesText.equipmentCard.text[context.language]}
          onClick={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

export default EquipmentCard;
