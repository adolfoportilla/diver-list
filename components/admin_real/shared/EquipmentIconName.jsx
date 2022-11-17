import Chip from "@mui/material/Chip";
import Image from "next/image";

import { EQUIPMENT_NAME_TO_DB_VALUE } from "../../../utils/supabase";

const EQUIPMENT_TYPE_TO_ICON = {
  [EQUIPMENT_NAME_TO_DB_VALUE.FINS]: "/icons/fins.svg",
  [EQUIPMENT_NAME_TO_DB_VALUE.BCD]: "/icons/diving-suit.svg",
  [EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR]: "/icons/regulator.svg",
  [EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT]: "/icons/wetsuit.svg",
  [EQUIPMENT_NAME_TO_DB_VALUE.MASK]: "/icons/diving-mask.svg",
  [EQUIPMENT_NAME_TO_DB_VALUE.TANK]: "/icons/oxygen-tank.svg",
};

export default function EquipmentIconName(props) {
  return (
    <div className="flex flex-row">
      <div>
        <Chip
          label={
            <div className="flex flex-row">
              <div className="w-4 h-4">
                <Image
                  alt={props.type}
                  width={40}
                  height={40}
                  src={EQUIPMENT_TYPE_TO_ICON[props.type]}
                />
              </div>
              <span className="ml-1">{props.value}</span>
            </div>
          }
          size="small"
        />
      </div>
    </div>
  );
}
