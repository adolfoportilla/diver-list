import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import ReservationForm from "./ReservationForm";
import { Collapse } from "antd";
import { useState } from "react";
import { createReservation } from "../../../utils/api/reservation";

const { Panel } = Collapse;

export default function CreateReservationButton() {
  const [formVisible, setFormVisible] = useState(false);

  //Todo - autopopulate the date for the current calendar cell

  return (
    <>
      {formVisible ? (
        <Collapse
          className="shadow"
          style={{ borderColor: "#fafcfb" }}
          defaultActiveKey={["1"]}
          collapsible={false}
        >
          <Panel
            header={<span className="text-2xl font-bold">New Reservation</span>}
            key="1"
            showArrow={false}
            style={{ backgroundColor: "white" }}
          >
            <ReservationForm
              setFormVisible={setFormVisible}
              onSubmit={createReservation}
            />
          </Panel>
        </Collapse>
      ) : (
        <Fab
          className="fixed bottom-20 right-5 bg-sky-700"
          aria-label="add"
          onClick={() => setFormVisible(true)}
        >
          <div>
            <Add />
          </div>
        </Fab>
      )}
    </>
  );
}
