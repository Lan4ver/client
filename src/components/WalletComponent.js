import WalletGraph from "./WalletGraph";
import CreateTransaction from "./CreateTransaction";
import "./Home.css";
import React from "react";
import ModalWrapper from "./Modal";
import TransactionHistory from "./TransactionHistory";
import { useRef, useState, useEffect } from "react";
import {
  getWalletStatistic,
  getTotal,
  getAllTransaction,
  getWalletTransaction,
  postNewIncome,
  postNewTransaction,
  getAllStatistic,
  deleteIncome,
  deleteTransaction,
} from "../utils/endpoints";
import axios from "axios";

export default function WalletComponent({ wallet }) {
  const [totalBalance, setTotalBalance] = useState();
  const defaultTypeName = "Income";

  const postTransaction = (
    costTypeName,
    walletId,
    name,
    date,
    sum,
    costTypeId
  ) => {
    if (costTypeName === defaultTypeName) {
      axios
        .post(postNewIncome, {
          WalletId: walletId,
          Name: name,
          Sum: sum,
          Date: date,
        })
        .then((res) => {
          getAllData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(postNewTransaction, {
          Name: name,
          Sum: sum,
          Date: date,
          WalletId: walletId,
          CostTypeId: costTypeId,
        })
        .then((res) => {
          getAllData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const [deleteIncomeTransaction, setDeleteIncomeTransaction] = useState([]);
  // const [deleteCostTransaction, setDeleteCostTransaction] = useState([]);

  // const deleteTransaction = (
  //   category,
  //   setDeleteIncomeTransaction,
  //   setDeleteCostTransaction
  // ) => {
  //   setDeleteIncomeTransaction = axios
  //     .delete(deleteIncome(category.transactionId))
  //     .then((res) => {
  //       getAllData();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   setDeleteCostTransaction = axios
  //     .delete(deleteTransaction(category.transactionId))
  //     .then((res) => {
  //       getAllData();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const [walletTransactions, setWalletTransactions] = useState([]);
  const [allWalletTransactions, setAllWalletTransactions] = useState([]);

  const [walletInfo, setWalletInfo] = useState([]);
  const [allWalletInfo, setAllWalletInfo] = useState([]);

  const getAllData = () => {
    axios
      .get(getAllTransaction())
      .then((response) => {
        setAllWalletTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(getWalletTransaction(wallet.walletId))
      .then((response) => {
        setWalletTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(getAllStatistic())
      .then((response) => {
        setAllWalletInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(getWalletStatistic(wallet.walletId))
      .then((response) => {
        setWalletInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllData();
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
          <WalletGraph walletId={wallet.walletId} walletInfo={walletInfo} />
          <div className="form max-w-sm mx-auto w-96">
            <CreateTransaction
              walletId={wallet.walletId}
              post={postTransaction}
            />
            <TransactionHistory
              walletTransactions={walletTransactions}
            ></TransactionHistory>
          </div>
          <div className="global-graph-container">
            <ModalWrapper buttonText="Full Wallet Statistics">
              <WalletGraph walletInfo={allWalletInfo} />
            </ModalWrapper>
          </div>
          <div style={{ paddingTop: "0px" }}>
            <ModalWrapper buttonText="Full History Statistics">
              <TransactionHistory walletTransactions={allWalletTransactions} />
            </ModalWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
