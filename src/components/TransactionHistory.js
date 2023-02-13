import React from "react";
import "boxicons";
import { Button, Space, Modal, ColumnsType } from "antd";
import { useRef, useState, useEffect, useReducer } from "react";
import {
  getTransaction,
  getCostType,
  getIncome,
  deleteIncome,
  deleteTransaction,
} from "../utils/endpoints";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function TransactionHistory({ walletId }) {
  const [costImage, setCostImage] = useState([]);
  const CASH_IMAGE =
    "https://rwzydhznyespratlabcw.supabase.co/storage/v1/object/public/images/cash.png";

  useEffect(() => {
    axios
      .get(getCostType)
      .then((response) => {
        setCostImage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [costsHistory, setCostsHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

  useEffect(() => {
    axios
      .get(getTransaction)
      .then((response) => {
        setCostsHistory(
          response.data.filter(
            (transaction) => transaction.walletId === walletId
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(getIncome(walletId))
      .then((response) => {
        setIncomeHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col py-6 gap-5">
      <h1 className=" text-md font-bold text-xl">History</h1>
      <Scrollbars style={{ height: 250 }}>
        {incomeHistory.map((v, i) => {
          return (
            <div className="py-1">
              <Transaction
                image={CASH_IMAGE}
                key={i}
                category={v}
              ></Transaction>
            </div>
          );
        })}
        {costsHistory.map((v, i) => {
          let Image = costImage?.find(
            (image) => image.costTypeId === v.costTypeId
          )?.image;
          return (
            <div className="py-1">
              <Transaction image={Image} key={i} category={v}></Transaction>
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
}

export function Transaction({ category, image }) {
  const Delete = () => {
    console.log(category);
    if (category.incomeId) {
      axios.delete(deleteIncome(category.incomeId)).catch((error) => {
        console.error(error);
      });
    }
    if (category.costId) {
      axios.delete(deleteTransaction(category.costId)).catch((error) => {
        console.error(error);
      });
    }
  };

  if (!category) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        background: "light-grey",
        borderRadius: "10px",
      }}
    >
      <img src={image} style={{ width: "30px", height: "100%" }}></img>
      <span>{category.name ?? ""}</span>
      {category.sum ? <span>{category.sum + "$"}</span> : null}
      {category.amount ? <span>{category.amount + "$"}</span> : null}
      <Button
        onClick={() => {
          Delete();
        }}
      >
        <box-icon
          color={category.color ?? "#f9c74f"}
          size="15px"
          name="trash"
        ></box-icon>
      </Button>
    </div>
  );
}
