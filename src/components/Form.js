import React from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import { Button, Space, Cascader } from "antd";

export default function Form() {
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Name transaction"
              className="form-input"
            ></input>
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="Amount"
              className="form-input"
            ></input>
          </div>
          <div className="submit-btn">
            <Button type="primary" block>
              Make Transaction
            </Button>
          </div>
        </div>
      </form>
      <List></List>
    </div>
  );
}
