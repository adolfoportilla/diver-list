import { EQUIPMENT, EQUIPMENT_NAME_TO_DB_VALUE } from "../../../utils/supabase";
import EquipmentIconName from "./EquipmentIconName";

const EQUIPMENT_TYPE_TO_BLAH = {
  [EQUIPMENT_NAME_TO_DB_VALUE.FINS]: EQUIPMENT.FINS,
  [EQUIPMENT_NAME_TO_DB_VALUE.BCD]: EQUIPMENT.BCD,
  [EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR]: EQUIPMENT.REGULATOR,
  [EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT]: EQUIPMENT.WETSUIT,
  [EQUIPMENT_NAME_TO_DB_VALUE.MASK]: EQUIPMENT.MASK,
  [EQUIPMENT_NAME_TO_DB_VALUE.TANK]: EQUIPMENT.TANK,
};

const getLabelBasedOnQuip = (type, value) => {
  const option = EQUIPMENT_TYPE_TO_BLAH[type].find((entry) => {
    return entry.value === value;
  });
  if (option) {
    return option.label;
  }
};

export default function EquipmentPill(props) {
  return (
    <EquipmentIconName
      type={props.type}
      value={getLabelBasedOnQuip(props.type, props.value)}
    />
  );
}
