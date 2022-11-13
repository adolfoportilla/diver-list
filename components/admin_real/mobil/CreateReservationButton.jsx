import { Add, Cancel } from "@mui/icons-material";
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
            header={
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">New Reservation</span>
                <button onClick={() => setFormVisible(false)}>
                  <Cancel />
                </button>
              </div>
            }
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
          className="border-4 border-sky-400 shadow fixed bottom-20 right-5 "
          aria-label="add"
          onClick={() => setFormVisible(true)}
          color="error"
        >
          <Add className="" color="primary" />
        </Fab>
      )}
    </>
  );
}
