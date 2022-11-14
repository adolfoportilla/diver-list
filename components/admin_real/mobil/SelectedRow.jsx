import { Collapse } from "antd";
import { useState } from "react";
import { Button } from "@mui/material";
import moment from "moment/moment";
import ReservationForm from "./ReservationForm";
import { Edit } from "@mui/icons-material";
import {
  LAST_DIVES_TO_TEXT_MAPPING,
  NUM_OF_DIVES_TO_TEXT_MAPPING,
  DEEPEST_TO_TEXT_MAPPING,
} from "../../../utils/supabase";

import { updateReservation } from "../../../utils/api/reservation";

const Item = (props) => {
  return (
    <div className="grid grid-cols-2 border-l-4 border-sky-700">
      <span className="pl-6 pb-1 ">{props.name}</span>
      <span className="">
        {props.formatter ? props.formatter(props.value) : props.value}
      </span>
    </div>
  );
};

const { Panel } = Collapse;

export const SelectedRow = ({ selectedRow }) => {
  const [formVisible, setFormVisible] = useState(false);

  const items = [
    ["Reservation Type", "reservation_type"],
    ["Date", "date"],
    ["Email", "diver_information.email"],
    ["Age", "diver_information.age"],
    [
      "Deepest Dive",
      "deepest_dive",
      (value) => (value ? DEEPEST_TO_TEXT_MAPPING[value] : ""),
    ],
    ["Diver Certified", "diver_certified", (value) => (value ? "Yes" : "No")],
    [
      "Last Dive",
      "last_dive",
      (value) => (value ? LAST_DIVES_TO_TEXT_MAPPING[value] : ""),
    ],
    [
      "# Dives",
      "number_of_dives",
      (value) => (value ? NUM_OF_DIVES_TO_TEXT_MAPPING[value] : ""),
    ],
  ];

  const row = items.map((item) => {
    let value = selectedRow[item[1]];
    if (item[1].includes(".")) {
      const [first, second] = item[1].split(".");
      value = selectedRow[first][second];
    }
    console.log(item[2]);
    return (
      <Item name={item[0]} value={value} formatter={item[2]} key={item.id} />
    );
  });

  console.log(LAST_DIVES_TO_TEXT_MAPPING[3]);
  console.log(row);

  return (
    <div>
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
          {!formVisible ? (
            <div>
              <div className="text-end h-7">
                <Button
                  className="min-w-0"
                  onClick={() => setFormVisible(true)}
                >
                  <Edit className="w-4" />
                </Button>
              </div>
              {row}
            </div>
          ) : (
            <ReservationForm
              setFormVisible={setFormVisible}
              reservation={selectedRow}
              onSubmit={updateReservation}
            />
          )}
        </Panel>
      </Collapse>
    </div>
  );
};
