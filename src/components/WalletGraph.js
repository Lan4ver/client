import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import TransactionSummary from "./TransactionSummary";
import { useState, useEffect } from "react";

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

const WalletGraph = ({
  walletId,
  walletInfo,
  outcome,
  singleWalletBalance,
}) => {
  const [doughnutConfig, setDoughnutConfig] = useState(config);

  useEffect(() => {
    if (walletInfo) {
      setDoughnutConfig({
        data: {
          datasets: [
            {
              data: walletInfo.map((type) => type.percent.replace(" %", "")),
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
      {walletId !== undefined ? (
        <h3 className="mb-4 font-bold title" style={{ textAlign: "center" }}>
          Wallet Balance
          <span className="block text-2xl text-emerald-500">
            {singleWalletBalance}zł
          </span>
        </h3>
      ) : null}
      <div className="item">
        <div className="chart relative">
          <Doughnut {...doughnutConfig}></Doughnut>
          <h3 className="mb-4 font-bold title" style={{ textAlign: "center" }}>
            Expenses
            <span className="block text-3xl text-red-500">-{outcome} zł</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          <TransactionSummary walletInfo={walletInfo}></TransactionSummary>
        </div>
      </div>
    </div>
  );
};

export default WalletGraph;
