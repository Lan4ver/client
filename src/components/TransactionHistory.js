import React from "react";
import "boxicons";
import { Button } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function TransactionHistory({
  walletTransactions,
  deleteOneOfTransactions,
}) {
  return (
    <div className="flex flex-col py-6 gap-5">
      <h1 className=" text-md font-bold text-xl">History</h1>
      <Scrollbars style={{ height: 350 }}>
        {walletTransactions.map((v, i) => {
          return (
            <div className="py-1">
              <Transaction
                deleteOneOfTransactions={deleteOneOfTransactions}
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

export function Transaction({ category, image, deleteOneOfTransactions }) {
  const Delete = (data) => {
    deleteOneOfTransactions(
      category,
      category.transactionType,
      category.transactionId
    );
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
      <span>{category.amount + " zł"}</span>
      <Button onClick={Delete}>
        <box-icon
          color={category.color ?? "#f9c74f"}
          size="15px"
          name="trash"
        ></box-icon>
      </Button>
    </div>
  );
}
