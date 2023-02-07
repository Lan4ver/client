import React from "react";
import "boxicons";
import { Button, Space } from "antd";

const obj = [
  {
    name: "Savings",
    color: "#f9c74f",
  },
  {
    name: "Investment",
    color: "#f9c74f",
  },
  {
    name: "Expense",
    color: "#f9c74f",
  },
];

export default function List() {
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 text-md font-bold text-xl">History</h1>
      {obj.map((v, i) => (
        <Transaction key={i} category={v}></Transaction>
      ))}
    </div>
  );
}

function Transaction({ category }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#f9c74f"}` }}
    >
      <Button className="px-3">
        <box-icon
          color={category.color ?? "#f9c74f"}
          size="15px"
          name="trash"
        ></box-icon>
      </Button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
