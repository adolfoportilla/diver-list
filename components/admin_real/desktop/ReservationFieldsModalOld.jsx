import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Alert, DatePicker, Input } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import { Select } from "antd";
import { dateFormat, timeFormat } from "../shared/constants";
import FormField from "./FormField";
import { useUser } from "../../../utils/useUser";
import { openErrorNotification } from "../shared/reservationTableUtils";
import { openSuccessNotification } from "../shared/reservationTableUtils";
import { TableContext } from "../../states/ReservationTableContextProvider";

const { Option } = Select;

const ReservationFieldsModal = ({
  reservation = {},
  onSubmit,
  modalTitle,
  modalOpen = false,
  setModalOpen,
}) => {
  const context = React.useContext(TableContext);
  const { diveShop } = useUser();
  const dive_shop_id = diveShop ? diveShop.id : null;
  const id = reservation.id;
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time || 0);
  const [certified, setCertified] = useState(
    reservation.diver_certified ? reservation.diver_certified.toString() : null
  );
  const [reservationType, setReservationType] = useState(
    reservation.reservation_type
  );
  const [name, setName] = useState(
    reservation.diver_information ? reservation.diver_information.name : null
  );
  const [lastName, setLastName] = useState(
    reservation.diver_information
      ? reservation.diver_information.lastName
      : null
  );
  const [age, setAge] = useState(
    reservation.diver_information ? reservation.diver_information.age : null
  );
  const [experience, setExperience] = useState(reservation.number_of_dives);
  const [email, setEmail] = useState(
    reservation.diver_information ? reservation.diver_information.email : null
  );

  const successHandler = () => {
    context.getReservations();
    openSuccessNotification("success");
  };

  const errorHandler = () => {
    openErrorNotification("error");
  };

  const reservationValid = () => {
    if (
      date &&
      time &&
      certified &&
      reservationType &&
      experience &&
      name &&
      lastName &&
      age &&
      email
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      title={modalTitle}
      visible={modalOpen}
      okButtonProps={{ disabled: !reservationValid() }}
      onOk={() => {
        if (reservationValid()) {
          onSubmit({
            date,
            time,
            certified,
            reservationType,
            experience,
            dive_shop_id: dive_shop_id,
            id,
            diverInformation: {
              name: name,
              lastName: lastName,
              age: age,
              email: email,
            },
          }).then((results) => {
            results.error
              ? errorHandler()
              : results.data
              ? successHandler()
              : null;
          });
          setModalOpen(false);
        }
      }}
      onCancel={() => setModalOpen(false)}
    >
      <div className="flex flex-col">
        {!reservationValid() && (
          <Alert message="Please fill in all fields" type="error" showIcon />
        )}
        <FormField>
          <span>Date : </span>
          <DatePicker
            defaultValue={moment(date)}
            format={dateFormat}
            onChange={(value) =>
              setDate(value ? value.format(dateFormat) : null)
            }
            className="w-32"
          />
        </FormField>
        <FormField>
          <span>Time : </span>
          <TimePicker
            className="w-32"
            defaultValue={moment(time, timeFormat)}
            format={timeFormat}
            onChange={(value) =>
              setTime(value ? value.format(timeFormat) : null)
            }
          />
        </FormField>
        <FormField>
          <span>Certified : </span>
          <Select
            defaultValue={certified}
            className="w-32"
            onChange={(value) => setCertified(value)}
          >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </FormField>
        <FormField>
          <span>Reservation Type : </span>
          <Select
            defaultValue={reservationType}
            className="w-32"
            onChange={(value) => setReservationType(value)}
          >
            <Option value="recreational">recreational</Option>
            <Option value="certification">certification</Option>
          </Select>
        </FormField>
        <FormField>
          <span>Name : </span>
          <Input
            style={{ width: "9.1em" }}
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormField>
        <FormField>
          <span>Last Name : </span>
          <Input
            style={{ width: "9.1em" }}
            defaultValue={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormField>
        <FormField>
          <span>Age : </span>
          <Input
            style={{ width: "9.1em" }}
            defaultValue={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </FormField>
        <FormField>
          <span>Experience : </span>
          <Select
            defaultValue={experience}
            className="w-32"
            onChange={(value) => setExperience(value)}
          >
            <Option value="beginner">beginner</Option>
            <Option value="intermediate">intermediate</Option>
            <Option value="expert">expert</Option>
          </Select>
        </FormField>
        <FormField>
          <span>Email : </span>
          <Input
            style={{ width: "12em" }}
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
      </div>
    </Modal>
  );
};

export default ReservationFieldsModal;
