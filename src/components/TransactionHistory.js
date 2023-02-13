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

export default function TransactionHistory({ walletTransactions }) {
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

  return (
    <div className="flex flex-col py-6 gap-5">
      <h1 className=" text-md font-bold text-xl">History</h1>
      <Scrollbars style={{ height: 250 }}>
        {walletTransactions.map((v, i) => {
          return (
            <div className="py-1">
              <Transaction
                image={v.typeImage}
                key={i}
                category={v}
              ></Transaction>
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
    if (category.transactionType === "income") {
      axios
        .delete(deleteIncome(category.transactionId))
        // .then((res) => {
        //   getAllData();
        // })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios.delete(deleteTransaction(category.transactionId)).catch((error) => {
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
      <span>{category.amount + "$"}</span>
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
