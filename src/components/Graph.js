import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import axios from "../api/axios";

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

const GET_TOTAL = "/income?walletId=1";

const Graph = () => {
  // const [sum, setSum] = useState;
  // const response = await axios.get(GET_TOTAL, JSON.stringify({ sum }), {
  //   headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
  // });
  const getHyj = () => {
    axios.get(GET_TOTAL).then((response) => {
      console.log(response);
    });
    // axios.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     if (error.response.status === 401) {
    //       JSON.stringify({ name: "string", password: "string" });
    //     }
    //     return error;
    //   }
    // );
  };

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <button onClick={getHyj}>GET</button>
      <div className="item">
        <div className="chart relative">
          <Doughnut {...config}></Doughnut>
          <h3 className="mb-4 font-bold title">
            Total
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
