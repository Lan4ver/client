import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import TransactionSummary from "./TransactionSummary";
import axios from "axios";
import { BarsOutlined } from "@ant-design/icons";
import { Button, Space, Modal } from "antd";
import ModalWrapper from "./Modal";
import { useRef, useState, useEffect } from "react";
import { getAllFromWallets, getWalletStatistic } from "../utils/endpoints";

Chart.register(ArcElement);

const config = {
  data: {
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
        borderRadius: 30,
      },
    ],
  },
  options: {
    cutout: 115,
  },
};

const options = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
};

const WalletGraph = () => {
  const [walletInfo, setWalletInfo] = useState([]);
  const [doughnutConfig, setDoughnutConfig] = useState(config);

  useEffect(() => {
    axios
      .get(getWalletStatistic)
      .then((response) => {
        setWalletInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (walletInfo) {
      setDoughnutConfig({
        data: {
          datasets: [
            {
              data: walletInfo.map((type) => type.percent),
              backgroundColor: walletInfo.map((type) => type.color),
              hoverOffset: 4,
              borderRadius: 30,
            },
          ],
        },
        options: {
          cutout: 115,
        },
      });
    }
  }, [walletInfo]);

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="global-graph-container"></div>
      <h1 className="text-2xl">Statistic</h1>
      <div className="item">
        <div className="chart relative">
          <Doughnut {...doughnutConfig}></Doughnut>
          <h3 className="mb-4 font-bold title">
            Expenses
            <span className="block text-3xl text-emerald-400">{0} $</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* {labels} */}
          <TransactionSummary></TransactionSummary>
        </div>
      </div>
    </div>
  );
};

export default WalletGraph;
