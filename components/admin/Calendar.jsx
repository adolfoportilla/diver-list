import React from "react";
import "antd/dist/antd.css";
import { Badge, Calendar } from "antd";

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 25:
      listData = [
        {
          type: "warning",
          content: "Peter Larreu",
          time: "9:00",
        },
        {
          type: "success",
          content: "John Lopez",
          time: "10:00",
        },
      ];
      break;

    case 10:
      listData = [
        {
          type: "warning",
          content: "Jane Doe",
          time: "8:00",
        },
        {
          type: "success",
          content: "John McCarthy",
          time: "9:00",
        },
        {
          type: "error",
          content: "Ben Watts",
          time: "11:00",
        },
      ];
      break;
    case 29:
      listData = [
        {
          type: "warning",
          content: "Jane Ruiz",
          time: "7:00",
        },
        {
          type: "success",
          content: "Juan Ruy",
          time: "8:00",
        },
        {
          type: "error",
          content: "Peter Pan",
          time: "9:00",
        },
        {
          type: "error",
          content: "Diana Perez",
          time: "11:00",
        },
        {
          type: "error",
          content: "Julieta Rosas",
          time: "15:00",
        },
        {
          type: "error",
          content: "Dominico Gutierrez",
          time: "20:00",
        },
      ];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const _Calendar = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              text={
                <>
                  <span className="font-bold text-sm">{item.time}</span>
                  <span className="ml-1">{item.content}</span>
                </>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default _Calendar;
