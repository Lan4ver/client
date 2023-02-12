import WalletGraph from "./WalletGraph";
import CreateTransaction from "./CreateTransaction";
import TransactionHistory from "./TransactionHistory";
import WalletComponent from "./WalletComponent";
import WalletTab from "./WalletTab";
import { Button } from "antd";
import { logout } from "../data/actionCreators/authorizationActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BarsOutlined } from "@ant-design/icons";
import "./Home.css";
import React from "react";

const Home = ({ logout }) => {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center text-gray-80">
        <h1 className="text-4xl py-8 mb-5 bg-slate-800 text-white rounded">
          Expense Tracker
        </h1>

        <WalletTab></WalletTab>
        <Button
          onClick={() => {
            logout();
          }}
          className="logout-button"
          type="primary"
          danger
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    return {};
  },
  { logout }
)(Home);