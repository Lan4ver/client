import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import TransactionSummary from "./TransactionSummary";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAllFromWallets } from "../utils/endpoints";

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

const WalletGraph = ({ walletId, walletInfo }) => {
  const [outcome, setOutcome] = useState();

  useEffect(() => {
    axios
      .get(getAllFromWallets)
      .then((response) => {
        if (walletId === undefined) {
          let allOutcome = 0;
          response.data.forEach((element) => {
            allOutcome += element.outcome;
          });
          setOutcome(allOutcome);
        } else {
          let wallet = response.data.find((x) => x.walletId === walletId);
          setOutcome(wallet.outcome);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      {walletId !== undefined ? <h1 className="text-2xl">Statistic</h1> : null}
      <div className="item">
        <div className="chart relative">
          <Doughnut {...doughnutConfig}></Doughnut>
          {walletId !== undefined ? (
            <h3 className="mb-4 font-bold title">
              Expenses
              <span className="block text-3xl text-emerald-400">
                -{outcome} $
              </span>
            </h3>
          ) : (
            <h3
              className="mb-4 font-bold title"
              style={{ marginLeft: "110px" }}
            >
              Expenses
              <span className="block text-3xl text-emerald-400">
                -{outcome} $
              </span>
            </h3>
          )}
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* {labels} */}
          <TransactionSummary walletInfo={walletInfo}></TransactionSummary>
        </div>
      </div>
    </div>
  );
};

export default WalletGraph;
