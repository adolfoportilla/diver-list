import EquipmentPill from "./EquipmentPill";

export default function EquipmentPills(props) {
  return (
    <div className="flex flex-row space-x-1">
      {Object.entries(props.equipment).map(([key, value]) => {
        if (!value) {
          return null;
        }
        return <EquipmentPill key={key} type={key} value={value} />;
      })}
    </div>
  );
}
