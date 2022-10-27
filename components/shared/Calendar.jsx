import React from "react";
import { Calendar as _Calendar, Col, Row, Select } from "antd";

export const calendarHeader = ({ value, type, onChange, onTypeChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = start; i < end; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = value.year();
  const month = value.month();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }
  return (
    <div className="p-2 flex flex-row-reverse">
      <Row gutter={8}>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={month}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={year}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
          >
            {options}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
