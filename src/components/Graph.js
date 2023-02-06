import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import axios from "axios";
import { BarsOutlined } from "@ant-design/icons";
import { Button, Space, Modal } from "antd";

import { useRef, useState, useEffect } from "react";

Chart.register(ArcElement);

const config = {
  data: {
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        borderRadius: 30,
      },
    ],
  },
  options: {
    cutout: 115,
  },
};

const Graph = () => {
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <h1 className="text-2xl">Statistic</h1>
      <div className="item">
        <div className="chart relative">
          <Doughnut {...config}></Doughnut>
          <h3 className="mb-4 font-bold title">
            Expenses
            <span className="block text-3xl text-emerald-400">{0} $</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* {labels} */}
          <Labels></Labels>
        </div>
      </div>
    </div>
  );
};

export default Graph;
