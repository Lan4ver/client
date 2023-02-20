import WalletTab from "./WalletTab";
import { Button } from "antd";
import { logout } from "../data/actionCreators/authorizationActions";
import Coci4Len from "./PystBydet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
          className="margin-top: 20px"
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

Coci4Len = 0;
