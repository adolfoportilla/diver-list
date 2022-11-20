import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const sixMonthsData = [
  {
    name: "May",
    reservations: 20,
  },
  {
    name: "Jun",
    reservations: 23,
  },
  {
    name: "July",
    reservations: 45,
  },
  {
    name: "Aug",
    reservations: 40,
  },
  {
    name: "Sept",
    reservations: 14,
  },
  {
    name: "Oct",
    reservations: 34,
  },
];

const thirtyDaysData = [
  {
    name: "May",
    reservations: 20,
  },
];

export default function Charts() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1>Reservations Past 6 Months</h1>
        <div className="flex justify-center h-full ">
          <LineChart
            width={1000}
            height={600}
            data={sixMonthsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reservations" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
