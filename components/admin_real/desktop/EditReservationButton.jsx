import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Modal from "antd/lib/modal/Modal";
import { DatePicker, Input } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const EditReservationButton = ({ reservation }) => {
  console.log(reservation);
  const [modalOpen, setModalOpen] = useState(false);
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm";
  return (
    <div>
      <Modal
        title={"Edit Reservation"}
        style={{}}
        visible={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <div className="flex flex-col">
          <div className="p-4 w-80 flex justify-between">
            <span>Date : </span>
            <DatePicker
              defaultValue={moment(reservation.date, dateFormat)}
              format={dateFormat}
              className="w-32"
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Time : </span>
            <TimePicker
              defaultValue={moment(reservation.time, timeFormat)}
              format={timeFormat}
              className="w-32"
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Certified : </span>
            <Select
              defaultValue={reservation.diver_certified.toString()}
              className="w-32"
            >
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Reservation Type : </span>
            <Select
              defaultValue={reservation.reservation_type}
              className="w-32"
            >
              <Option value="recreational">recreational</Option>
              <Option value="certification">certification</Option>
            </Select>
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Name : </span>
            <Input
              style={{ width: "9.1em" }}
              defaultValue={reservation.diver_information.name}
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Last Name : </span>
            <Input
              style={{ width: "9.1em" }}
              defaultValue={reservation.diver_information.lastName}
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Age : </span>
            <Input
              style={{ width: "9.1em" }}
              defaultValue={reservation.diver_information.age}
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Experience : </span>
            <Input
              style={{ width: "9.1em" }}
              defaultValue={reservation.number_of_dives}
            />
          </div>
          <div className="p-4 w-80 flex justify-between">
            <span>Email : </span>
            <Input
              style={{ width: "9.1em" }}
              defaultValue={reservation.diver_information.email}
            />
          </div>
        </div>
      </Modal>
      <Button className="min-w-0" onClick={() => setModalOpen(true)}>
        <Edit className="w-4" />
      </Button>
    </div>
  );
};

export default EditReservationButton;
