import React from "react";
import "boxicons";
import { Button, Space, Modal } from "antd";
import { useRef, useState, useEffect } from "react";
import { getStatistic } from "../utils/endpoints";
import axios from "axios";
import { Transaction } from "./TransactionHistory";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function FullHistory() {
  const [fullHistory, setFullHistory] = useState([]);

  useEffect(() => {
    axios
      .get(getStatistic())
      .then((response) => {
        setFullHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 text-md font-bold text-xl">History</h1>
      <Scrollbars style={{ height: 400 }}>
        {fullHistory.map((v, i) => {
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
