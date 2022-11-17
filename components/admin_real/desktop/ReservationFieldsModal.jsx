import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Form, Button, DatePicker, Input, InputNumber, Radio } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import { Alert } from "@mui/material";

import { dateFormat, timeFormat } from "../shared/constants";
import { useUser } from "../../../utils/useUser";
import {
  NUM_OF_DIVES,
  DEEPEST_DIVE,
  DEEPEST_TO_TEXT_MAPPING,
  NUM_OF_DIVES_TO_TEXT_MAPPING,
  EQUIPMENT_NAME_TO_DB_VALUE,
} from "../../../utils/supabase";
import { openSuccessNotification } from "../shared/reservationTableUtils";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";
import { currentDateIsOlderThanToday } from "../shared/calendarUtil";
import { get } from "lodash";
import EquipmentForm from "./EquipmentForm";

const formatValues = (values) => {
  const result = {
    date: values.date ? moment(values.date).format(dateFormat) : null,
    time: values.time ? moment(values.time).format(timeFormat) : null,
    diver_certified: values.certified === "yes" ? true : false,
    reservation_type: values.reservation_type,
    number_of_dives: values.number_of_dives,
    deepest_dive: values.deepest_dive,
    diver_information: {
      name: values.name,
      lastName: values.lastName,
      age: values.age,
      email: values.email,
    },
  };

  if (
    Object.keys(values).some((element) =>
      [
        EQUIPMENT_NAME_TO_DB_VALUE.FINS,
        EQUIPMENT_NAME_TO_DB_VALUE.BCD,
        EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT,
        EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR,
        EQUIPMENT_NAME_TO_DB_VALUE.MASK,
        EQUIPMENT_NAME_TO_DB_VALUE.TANK,
      ].includes(element)
    )
  ) {
    result.equipment_information = {
      [EQUIPMENT_NAME_TO_DB_VALUE.FINS]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.FINS] || null,
      [EQUIPMENT_NAME_TO_DB_VALUE.BCD]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.BCD] || null,
      [EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT] || null,
      [EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR] || null,
      [EQUIPMENT_NAME_TO_DB_VALUE.MASK]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.MASK] || null,
      [EQUIPMENT_NAME_TO_DB_VALUE.TANK]:
        values[EQUIPMENT_NAME_TO_DB_VALUE.TANK] || null,
    };
  }
  return result;
};

const MAPPING = {
  Create: "creating",
  Update: "updating",
};

const ReservationFieldsModal = ({
  reservation = {},
  onSubmit,
  modalTitle,
  modalOpen = false,
  setModalOpen,
}) => {
  const context = React.useContext(ReservationsContext);
  const { diveShop } = useUser();
  const diveShopId = diveShop ? diveShop.id : null;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = React.useState(null);

  const _onFinish = (values) => {
    setError(null);
    setIsLoading(true);
    const formattedValues = formatValues(values);
    onSubmit({
      values: formattedValues,
      reservationId: reservation.id,
      diveShopId,
    })
      .then((results) => {
        if (results.error) {
          // TODO(fofo): Set the alert with error
          console.log("results.error", results.error);
          setError(
            `There was error ${MAPPING[modalTitle]} your reservation. Please contact support@diverlist.com`
          );
        } else {
          context.getTableReservations();
          setModalOpen(false);
          openSuccessNotification(
            "success",
            "Successful!",
            "Reservation updated successful!"
          );
        }
      })
      .catch((_error) => {
        console.log(_error);
        setError(
          `There was error ${MAPPING[modalTitle]} your reservation. Please contact support@diverlist.com`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal
      title={modalTitle + " Reservation"}
      visible={modalOpen}
      onCancel={() => {
        form.resetFields();
        setModalOpen(false);
        setError(null);
      }}
      footer={null}
      width={650}
      destroyOnClose={true}
    >
      <div>
        {error !== null ? (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        ) : null}
        <Form
          form={form}
          onFinish={_onFinish}
          initialValues={{
            date: reservation.date
              ? moment(reservation.date, dateFormat)
              : null,
            reservation_type: reservation.reservation_type || null,
            certified: reservation.diver_certified ? "yes" : "no",
            email: reservation.diver_information?.email || null,
            name: reservation.diver_information?.name || null,
            lastName: reservation.diver_information?.lastName || null,
            age: reservation.diver_information?.age || null,
            time: reservation.time
              ? moment(reservation.time, timeFormat)
              : null,
            number_of_dives: reservation.number_of_dives || null,
            deepest_dive: reservation.deepest_dive || null,
            [EQUIPMENT_NAME_TO_DB_VALUE.MASK]: reservation.equipment_information
              ? get(
                  reservation,
                  `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.MASK}`,
                  null
                )
              : null,
            [EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT]:
              reservation.equipment_information
                ? get(
                    reservation,
                    `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT}`,
                    null
                  )
                : null,
            [EQUIPMENT_NAME_TO_DB_VALUE.BCD]: reservation.equipment_information
              ? get(
                  reservation,
                  `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.BCD}`,
                  null
                )
              : null,
            [EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR]:
              reservation.equipment_information
                ? get(
                    reservation,
                    `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR}`,
                    null
                  )
                : null,
            [EQUIPMENT_NAME_TO_DB_VALUE.FINS]: reservation.equipment_information
              ? get(
                  reservation,
                  `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.FINS}`,
                  null
                )
              : null,
            [EQUIPMENT_NAME_TO_DB_VALUE.TANK]: reservation.equipment_information
              ? get(
                  reservation,
                  `equipment_information.${EQUIPMENT_NAME_TO_DB_VALUE.TANK}`,
                  null
                )
              : null,
          }}
        >
          <Form.Item
            label="Reservation Type"
            name="reservation_type"
            rules={[{ required: true, message: "Please enter type!" }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="recreational">{"recreational"}</Radio.Button>
              <Radio.Button value="certification">
                {"certification"}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div className="flex flex-row">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select data!" }]}
            >
              <DatePicker
                format={dateFormat}
                disabledDate={currentDateIsOlderThanToday}
              />
            </Form.Item>
            <div className="ml-8">
              <Form.Item label="Time" name="time" rules={[{ required: false }]}>
                <TimePicker use12Hours format={timeFormat} minuteStep={5} />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-52">
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="John" maxLength={16} />
              </Form.Item>
            </div>
            <div className="w-52">
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Doe" maxLength={16} />
              </Form.Item>
            </div>
            <Form.Item label="Age" name="age" rules={[{ required: false }]}>
              <InputNumber min={1} max={150} placeholder="18" />
            </Form.Item>
          </div>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input className="w-full" placeholder="i.e. email" />
          </Form.Item>
          <Form.Item
            label="Certified"
            name="certified"
            rules={[{ required: false }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"yes"}>{"yes"}</Radio.Button>
              <Radio.Button value={"no"}>{"no"}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Experience (dives)"
            name="number_of_dives"
            rules={[{ required: false }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={NUM_OF_DIVES.BEGINNER}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.BEGINNER]}
              </Radio.Button>
              <Radio.Button value={NUM_OF_DIVES.INTERMEDIATE}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.INTERMEDIATE]}
              </Radio.Button>
              <Radio.Button value={NUM_OF_DIVES.ADVANCED}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.ADVANCED]}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Deepest Dive"
            name="deepest_dive"
            rules={[{ required: false }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={DEEPEST_DIVE.SHALLOW}>
                {DEEPEST_TO_TEXT_MAPPING[DEEPEST_DIVE.SHALLOW]}
              </Radio.Button>
              <Radio.Button value={DEEPEST_DIVE.MEDIUM}>
                {DEEPEST_TO_TEXT_MAPPING[DEEPEST_DIVE.MEDIUM]}
              </Radio.Button>
              <Radio.Button value={DEEPEST_DIVE.DEEP}>
                {DEEPEST_TO_TEXT_MAPPING[DEEPEST_DIVE.DEEP]}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <EquipmentForm />
          <Form.Item
            wrapperCol={{
              offset: 7,
            }}
          >
            <Button
              loading={isLoading}
              className="mt-3 w-56"
              type="primary"
              htmlType="submit"
            >
              {modalTitle}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ReservationFieldsModal;
