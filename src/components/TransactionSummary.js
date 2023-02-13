import React from "react";
import axios from "axios";
import { getStatistic, getCostType } from "../utils/endpoints";
import { useRef, useState, useEffect } from "react";
import { getAllFromWallets, getWalletStatistic } from "../utils/endpoints";

const obj = [
  {
    type: "Savings",
    color: "#f9c74f",
    percent: 45,
  },
  {
    type: "Investment",
    color: "#f9c74f",
    percent: 20,
  },
  {
    type: "Expense",
    color: "#f9c74f",
    percent: 10,
  },
];

export default function TransactionSummary({ walletInfo }) {
  return (
    <>
      {walletInfo.map((v, i) => {
        return (
          <>
            {/* {v?.name} */}
            <LabelComponent image={v.image} key={i} data={v}></LabelComponent>
          </>
        );
      })}
    </>
  );
}

function LabelComponent({ data, image }) {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <img src={image} style={{ width: "30px", height: "100%" }}></img>
        <span>{data.name ?? ""}</span>
        <h3>{data.ty4 ?? ""}</h3>
      </div>
      <h3 className="font-bold">{data.percent ?? 0}</h3>
    </div>
  );
}
