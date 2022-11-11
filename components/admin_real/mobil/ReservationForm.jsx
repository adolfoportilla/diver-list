import React, { useEffect, useState } from "react";
import { Form, Button, DatePicker, Input, InputNumber, Radio } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import { dateFormat, timeFormat } from "../shared/constants";
import { useUser } from "../../../utils/useUser";
import {
  NUM_OF_DIVES,
  DEEPEST_DIVE,
  DEEPEST_TO_TEXT_MAPPING,
  NUM_OF_DIVES_TO_TEXT_MAPPING,
} from "../../../utils/supabase";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../shared/reservationTableUtils";
import { ReservationsContext } from "../../shared/ReservationsContextProvider";
import { deleteReservation } from "../../../utils/api/reservation";

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
  return result;
};

const ReservationForm = ({ reservation = {}, onSubmit, setFormVisible }) => {
  const context = React.useContext(ReservationsContext);
  const { diveShop } = useUser();
  const diveShopId = diveShop ? diveShop.id : null;
  const [form] = Form.useForm();
  const _onFinish = (values) => {
    context.setIsLoading(true);
    const formattedValues = formatValues(values);
    onSubmit({
      values: formattedValues,
      reservationId: reservation.id,
      diveShopId,
    })
      .then((results) => {
        setFormVisible(false);
        form.resetFields();
        if (results.error) {
          openErrorNotification("error", "Failed", "Something went wrong");
        } else {
          openSuccessNotification(
            "success",
            "Successful!",
            "Reservation updated successful!"
          );
          context.setSelectedRow(results.data[0]);
        }
        context.getCalendarReservations();
        context.getTableReservations();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        context.setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-col  ">
      <Form
        form={form}
        onFinish={_onFinish}
        initialValues={{
          date: reservation.date ? moment(reservation.date, dateFormat) : null,
          reservation_type: reservation.reservation_type || null,
          certified: reservation.diver_certified ? "yes" : "no",
          email: reservation.diver_information?.email || null,
          name: reservation.diver_information?.name || null,
          lastName: reservation.diver_information?.lastName || null,
          age: reservation.diver_information?.age || null,
          time: reservation.time ? moment(reservation.time, timeFormat) : null,
          number_of_dives: reservation.number_of_dives || NUM_OF_DIVES.BEGINNER,
          deepest_dive: reservation.deepest_dive || DEEPEST_DIVE.SHALLOW,
        }}
      >
        <Form.Item
          label="Reservation Type"
          name="reservation_type"
          rules={[{ required: true, message: "Please enter type!" }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="recreational">{"recreational"}</Radio.Button>
            <Radio.Button value="certification">{"certification"}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <div className="grid grid-cols-2">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select data!" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label="Time" name="time" rules={[{ required: false }]}>
            <TimePicker use12Hours format={timeFormat} minuteStep={5} />
          </Form.Item>
        </div>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="John" maxLength={16} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Doe" maxLength={16} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input className="w-full" placeholder="i.e. email" />
        </Form.Item>
        <div className="grid grid-cols-2">
          <Form.Item label="Age" name="age" rules={[{ required: false }]}>
            <InputNumber min={1} max={150} placeholder="18" />
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
        </div>
        <Form.Item
          label="Experience"
          name="number_of_dives"
          rules={[{ required: false }]}
        >
          <Radio.Group buttonStyle="solid">
            <div className="flex flex-col">
              <Radio.Button value={NUM_OF_DIVES.BEGINNER}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.BEGINNER]}
              </Radio.Button>
              <Radio.Button value={NUM_OF_DIVES.INTERMEDIATE}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.INTERMEDIATE]}
              </Radio.Button>
              <Radio.Button value={NUM_OF_DIVES.ADVANCED}>
                {NUM_OF_DIVES_TO_TEXT_MAPPING[NUM_OF_DIVES.ADVANCED]}
              </Radio.Button>
            </div>
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
        {Object.keys(reservation).length > 0 ? (
          <Form.Item>
            <Button
              loading={false}
              className=""
              danger
              onClick={() => {
                context.setIsLoading(true);
                deleteReservation(reservation.id)
                  .then((results) => {
                    setFormVisible(false);
                    context.setSelectedRow({});
                    if (results.error) {
                      openErrorNotification(
                        "error",
                        "Failed",
                        "Something went wrong"
                      );
                    } else {
                      openSuccessNotification(
                        "success",
                        "Successful!",
                        "Reservation deleted successfully!"
                      );
                    }
                    context.getCalendarReservations();
                    context.getTableReservations();
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                  .finally(() => {
                    context.setIsLoading(false);
                  });
              }}
            >
              Delete Reservation
            </Button>
          </Form.Item>
        ) : null}
        <div className="flex justify-end ">
          <Button onClick={() => setFormVisible(false)} className="">
            Cancel
          </Button>
          <Form.Item>
            <Button loading={false} className="ml-2" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ReservationForm;
