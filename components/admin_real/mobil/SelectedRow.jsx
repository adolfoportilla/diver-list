import { Collapse } from "antd";
import moment from "moment/moment";

const Item = (props) => {
  return (
    <div className="grid grid-cols-2 border-l-4 border-sky-700">
      <span className="pl-6 pb-1 ">{props.name}</span>
      <span className="">{props.value}</span>
    </div>
  );
};

const { Panel } = Collapse;

export const SelectedRow = ({ selectedRow }) => {
  const items = [
    ["Reservation Type", "reservation_type"],
    ["Date", "date"],
    ["Email", "diver_information.email"],
    ["Age", "diver_information.age"],
    ["Deepest Dive", "deepest_dive"],
    ["Diver Certified", "diver_certified", (value) => (value ? "Yes" : "No")],
    ["Last Dive", "last_dive"],
    ["# Dives", "number_of_dives"],
  ];

  return (
    <Collapse
      className="shadow"
      style={{ borderColor: "#fafcfb" }}
      defaultActiveKey={["1"]}
    >
      <Panel
        header={
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold">{`${selectedRow.diver_information.name} ${selectedRow.diver_information.lastName}`}</span>
            <span className="italic">
              {selectedRow.time
                ? moment(selectedRow.time, "HH:mm:ss").format("hh:mm A")
                : "No time specified"}
            </span>
          </div>
        }
        key="1"
        showArrow={false}
        style={{ backgroundColor: "white" }}
      >
        {items.map((item) => {
          let value = selectedRow[item[1]];
          if (item[1].includes(".")) {
            const [first, second] = item[1].split(".");
            value = selectedRow[first][second];
          }
          return (
            <Item
              name={item[0]}
              value={value}
              formatter={item[2]}
              key={item.id}
            />
          );
        })}
      </Panel>
    </Collapse>
  );
};
