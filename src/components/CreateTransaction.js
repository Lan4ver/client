import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TransactionHistory from "./TransactionHistory";
import { DatePickerProps } from "antd";
import { Button, Space, Cascader, DatePicker } from "antd";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { getCostType, getAllIncome, postTransaction } from "../utils/endpoints";

export default function CreateTransaction() {
  const [income, setIncomeHistory] = useState([]);
  const [name, setName] = useState();
  const [sum, setSum] = useState(0);
  const [date, setDate] = useState("");
  const [costTypeId, setCostTypeId] = useState();
  const [walletId, setWalletId] = useState();
  const [costTypeName, setCostTypeName] = useState();

  useEffect(() => {
    axios
      .get(getAllIncome)
      .then((response) => {
        setIncomeHistory(response.data);
        if (response.data.length > 0) setWalletId(response.data[0].walletId);
      })
      .catch((error) => {
        console.error(error);
      });
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
    setCostTypeId(JSON.parse(event.target.value).costTypeId);
    console.log(JSON.parse(event.target.value).costTypeId);
  };

  const onSubmit = (data) => {
    axios
      .post(postTransaction, {
        Name: name,
        Sum: sum,
        Date: date,
        WalletId: walletId,
        CostTypeId: costTypeId,
      })
      .catch((error) => {
        console.log(error);
      });
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
            <option value="income" defaultValue>
              Investment
            </option>
            {costType?.map((i, index) => (
              <option value={JSON.stringify(i)} defaultValue={index === 0}>
                {i.name}
              </option>
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
      <TransactionHistory></TransactionHistory>
    </div>
  );
}
