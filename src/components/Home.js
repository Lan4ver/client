import Graph from "./Graph";
import Form from "./Form";
import { Button, Space, Modal } from "antd";
import { logout } from "../data/actionCreators/authorizationActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { getTotal } from "../utils/endpoints";
import { useRef, useState, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";

const Home = ({ logout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-80">
        <h1 className="text-4xl py-8 mb-5 bg-slate-800 text-white rounded">
          Expense Tracker
        </h1>
        <h2>Total Balance</h2>
        <h3 className="mb-4 font-bold title">
          <span className="block text-3xl text-emerald-400">{0} zł</span>
        </h3>
        <div>
          <>
            <Button type="primary" onClick={showModal}>
              Global <BarsOutlined />
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Graph></Graph>
            </Modal>
          </>
        </div>
        {/* { grid columns } */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* { chart } */}
          <Graph></Graph>
          {/* {form} */}
          <Form></Form>
        </div>
        <Button
          onClick={() => {
            logout();
          }}
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
