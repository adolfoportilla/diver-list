import React from "react";
import Image from "next/image";
import { isEmpty } from "lodash";

import CardComponent from "./CardComponent";
import SelectComponent from "./SelectComponent";
import { MyContext } from "../../ReservationController";

const getTextBasedOnOptions = (choice, options) => {
  const findOption = options.find(({ value }) => {
    return choice === value;
  });
  // THIS SHOULD NEVER HAPPEN.
  // If this happens, it means the options do not contain a value that matches the choice
  if (isEmpty(findOption)) {
    return null;
  }
  return findOption.label;
};

const EquipmentCard = ({
  choice,
  setChoice,
  icon,
  text,
  options,
  selectLabel,
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
            choice !== null ? (
              <div className="flex flex-col items-center">
                <span>{text}</span>
                <span className="italic text-xs font-normal text-gray-800">
                  {getTextBasedOnOptions(choice, options)}
                </span>
              </div>
            ) : (
              text
            )
          }
          onClick={() => setVisible(!visible)}
          additionalClassName={
            choice !== null
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
              label={selectLabel}
              options={options}
              defaultValue={defaultOption}
            />
          }
          // text={statesText.equipmentCard.text[context.language]}
          onClick={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

export default EquipmentCard;
