import WalletGraph from "./WalletGraph";
import CreateTransaction from "./CreateTransaction";
import "./Home.css";
import React from "react";
import ModalWrapper from "./Modal";
import TransactionHistory from "./TransactionHistory";
import { useRef, useState, useEffect } from "react";
import { getAllFromWallets, getTotal } from "../utils/endpoints";
import axios from "axios";

export default function WalletComponent() {
  const [totalBalance, setTotalBalance] = useState();

  useEffect(() => {
    axios
      .get(getTotal)
      .then((response) => {
        setTotalBalance(response.data.totalBalance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center text-gray-80">
        <h2 className="balance-title">Total Balance</h2>
        <h3 className="mb-4 font-bold title">
          <span className="block text-3xl text-emerald-400 balance-amount">
            {totalBalance} zł
          </span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <WalletGraph />
          <CreateTransaction />
          <div className="global-graph-container">
            <ModalWrapper
              title="Wallet name"
              buttonText="Full Wallet Statistics"
            >
              <WalletGraph />
            </ModalWrapper>
          </div>
          <div>
            <ModalWrapper
              title="Wallet name"
              buttonText="Full History Statistics"
            >
              <TransactionHistory />
            </ModalWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
