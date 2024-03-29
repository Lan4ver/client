import React from "react";
import { Button, Space, DatePicker } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { getCostType, getAllIncome } from "../utils/endpoints";

export default function CreateTransaction({
  walletId,
  post,
  defaultTypeName = "Income",
}) {
  const [income, setIncomeHistory] = useState([]);
  const [name, setName] = useState();
  const [sum, setSum] = useState(0);
  const [date, setDate] = useState("");
  const [costTypeId, setCostTypeId] = useState();
  const [costTypeName, setCostTypeName] = useState();

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
    post(costTypeName, walletId, name, date, sum, costTypeId);
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
    </div>
  );
}
