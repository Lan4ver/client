import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postRegister } from "../utils/endpoints";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  return (
    <div style={{ width: 500, margin: "auto" }}>
      <Input
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        style={{ marginTop: "5px" }}
        placeholder="Username"
        suffix={
          <Tooltip title="Enter your username">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />

      <Input.Password
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Input password"
        style={{ marginTop: "5px" }}
      />

      <Button
        type="primary"
        onClick={() => {
          axios
            .post(postRegister, {
              name: userName,
              password: password,
            })
            .then((res) => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        block
        style={{ marginTop: "5px" }}
      >
        Register
      </Button>
    </div>
  );
};

export default Register;
