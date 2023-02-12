import React from "react";
import "boxicons";
import { Button, Space, Modal } from "antd";
import { useRef, useState, useEffect } from "react";
import { getTransaction, getCostType, getIncome } from "../utils/endpoints";
import axios from "axios";

export default function TransactionHistory() {
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

  useEffect(() => {
    axios
      .get(getTransaction)
      .then((response) => {
        setCostsHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [incomeHistory, setIncomeHistory] = useState([]);

  useEffect(() => {
    axios
      .get(getIncome)
      .then((response) => {
        setIncomeHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 text-md font-bold text-xl">History</h1>
      {incomeHistory.map((v, i) => {
        return (
          <>
            <Transaction image={CASH_IMAGE} key={i} category={v}></Transaction>
          </>
        );
      })}
      {costsHistory.map((v, i) => {
        let Image = costImage?.find(
          (image) => image.costTypeId === v.costTypeId
        )?.image;
        return (
          <>
            <Transaction image={Image} key={i} category={v}></Transaction>
          </>
        );
      })}
    </div>
  );
}

function Transaction({ category, image }) {
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
      <span>{category.sum ?? ""}$</span>
      <Button>
        <box-icon
          color={category.color ?? "#f9c74f"}
          size="15px"
          name="trash"
        ></box-icon>
      </Button>
    </div>
  );
}
