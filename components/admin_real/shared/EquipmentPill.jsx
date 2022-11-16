import Chip from "@mui/material/Chip";
import Image from "next/image";

const EQUIPMENT_TYPE_TO_ICON = {
  finSize: "/icons/fins.svg",
  bcdSize: "/icons/diving-suit.svg",
  regulatorChoice: "/icons/regulator.svg",
  wetsuitSize: "/icons/wetsuit.svg",
  maskChoice: "/icons/diving-mask.svg",
  tankSize: "/icons/oxygen-tank.svg",
};

export default function EquipmentPill(props) {
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
