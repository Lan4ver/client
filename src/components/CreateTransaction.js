import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TransactionHistory from "./TransactionHistory";
import { DatePickerProps } from "antd";
import { Button, Space, Cascader, DatePicker } from "antd";
import axios from "axios";
import { useRef, useState, useEffect, useReducer } from "react";
import {
  getCostType,
  getAllIncome,
  postTransaction,
  postNewIncome,
} from "../utils/endpoints";

export default function CreateTransaction({ walletId }) {
  const [income, setIncomeHistory] = useState([]);
  const [name, setName] = useState();
  const [sum, setSum] = useState(0);
  const [date, setDate] = useState("");
  const [costTypeId, setCostTypeId] = useState();
  const [costTypeName, setCostTypeName] = useState();
  const defaultTypeName = "Income";

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get(getAllIncome)
      .then((response) => {
        setIncomeHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setCostTypeName(defaultTypeName);
  }, []);

  const [costType, setCostType] = useState([]);

  useEffect(() => {
    axios
      .get(getCostType)
      .then((response) => {
        setCostType(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onDateChange = (date, dateString) => {
    setDate(date);
  };

  const onCostTypeChange = (event) => {
    setCostTypeName(event.target.value);
    setCostTypeId(
      costType.find((x) => x.name === event.target.value).costTypeId
    );
  };

  const onSubmit = (data) => {
    if (costTypeName === defaultTypeName) {
      axios
        .post(postNewIncome, {
          WalletId: walletId,
          Name: name,
          Sum: sum,
          Date: date,
        })
        .then((response) => {
          forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(postTransaction, {
          Name: name,
          Sum: sum,
          Date: date,
          WalletId: walletId,
          CostTypeId: costTypeId,
        })
        .then((response) => {
          forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form">
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name transaction"
              className="form-input"
            ></input>
          </div>
          <select
            value={costTypeName}
            className="form-input"
            onChange={onCostTypeChange}
          >
            <option value={defaultTypeName} defaultValue>
              Investment
            </option>
            {costType?.map((i, index) => (
              <option value={i.name}>{i.name}</option>
            ))}
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="Amount"
              className="form-input"
              onChange={(e) => {
                setSum(parseFloat(e.target.value));
              }}
            ></input>
          </div>
          <div className="input-group">
            <Space direction="vertical"></Space>
            <DatePicker onChange={onDateChange} />
          </div>
          <div className="submit-btn">
            <Button type="primary" onClick={onSubmit} block>
              Make Transaction
            </Button>
          </div>
        </div>
      </form>
      <TransactionHistory walletId={walletId}></TransactionHistory>
    </div>
  );
}
