import WalletGraph from "./WalletGraph";
import CreateTransaction from "./CreateTransaction";
import React from "react";
import ModalWrapper from "./Modal";
import TransactionHistory from "./TransactionHistory";
import { useState, useEffect } from "react";
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
  getAllFromWallets,
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

  const deleteOneOfTransactions = (
    category,
    transactionType,
    transactionId
  ) => {
    if (transactionType === "income") {
      axios
        .delete(deleteIncome(category.transactionId))
        .then((res) => {
          getAllData();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (transactionType === "cost") {
      axios
        .delete(deleteTransaction(category.transactionId))
        .then((res) => {
          getAllData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [walletTransactions, setWalletTransactions] = useState([]);
  const [allWalletTransactions, setAllWalletTransactions] = useState([]);

  const [walletInfo, setWalletInfo] = useState([]);
  const [allWalletInfo, setAllWalletInfo] = useState([]);

  const [outcome, setOutcome] = useState();
  const [allOutcome, setAllOutcome] = useState();

  const [singleWalletBalance, setSingleWalletBalance] = useState();

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
        let AllWalletOutcome = 0;
        response.data.forEach((element) => {
          AllWalletOutcome += element.amount;
        });
        setAllOutcome(AllWalletOutcome);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(getWalletStatistic(wallet.walletId))
      .then((response) => {
        setWalletInfo(response.data);
        let WalletOutcome = 0;
        response.data.forEach((element) => {
          WalletOutcome += element.amount;
        });
        setOutcome(WalletOutcome);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(getTotal)
      .then((response) => {
        setTotalBalance(response.data.totalBalance);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(getAllFromWallets)
      .then((response) => {
        setSingleWalletBalance(response.data.balance);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(singleWalletBalance);
  };

  useEffect(() => {
    getAllData();
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
          <WalletGraph
            walletId={wallet.walletId}
            walletInfo={walletInfo}
            outcome={outcome}
          />
          <div className="form max-w-sm mx-auto w-96">
            <CreateTransaction
              walletId={wallet.walletId}
              post={postTransaction}
            />
            <TransactionHistory
              walletTransactions={walletTransactions}
              deleteOneOfTransactions={deleteOneOfTransactions}
            ></TransactionHistory>
          </div>
          <div className="global-graph-container">
            <ModalWrapper buttonText="Full Wallet Statistics">
              <WalletGraph walletInfo={allWalletInfo} outcome={allOutcome} />
            </ModalWrapper>
          </div>
          <div style={{ paddingTop: "0px" }}>
            <ModalWrapper buttonText="Full History Statistics">
              <TransactionHistory
                walletTransactions={allWalletTransactions}
                deleteOneOfTransactions={deleteOneOfTransactions}
              />
            </ModalWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
