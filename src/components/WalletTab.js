import React, { useRef, useState, useEffect } from "react";
import { Tabs, Modal, Button, Input } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import Home from "./Home";
import WalletComponent from "./WalletComponent";
import ModalWrapper from "./Modal";
import WalletGraph from "./WalletGraph";
import axios from "axios";
import { postNewWallet, getAllWallets } from "../utils/endpoints";

const { confirm } = Modal;

const initialItems = [
  {
    /*label: "Tab 1", children: "Content of Tab 1", key: "1"*/
  },
];

function WalletTab() {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const [walletName, setWalletName] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tabPosition, setTabPosition] = useState("left");

  useEffect(() => {
    axios
      .get(getAllWallets)
      .then((response) => {
        const wallets = response.data;
        let newActiveKey = ``;
        const newPanes = [];
        wallets.forEach((item) => {
          newActiveKey = `newTab${newTabIndex.current++}`;
          newPanes.push({
            label: item.name,
            children: <WalletComponent></WalletComponent>,
            key: newActiveKey,
          });
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: walletName, //
      children: <WalletComponent></WalletComponent>,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (walletName && walletName.trim().length > 0) {
      add();
      axios
        .post(postNewWallet, {
          Name: walletName,
          CurrencyId: "1",
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsModalOpen(false);
    setWalletName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setWalletName("");
  };

  const onPress = (targetKey, action) => {
    if (action === "add") {
      showModal();
    } else {
      remove(targetKey);
    }
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="New wallet name"
          onChange={(e) => setWalletName(e.target.value)}
        />
      </Modal>
      <Tabs
        tabPosition={tabPosition}
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onPress}
        items={items}
      ></Tabs>
      {items.length <= 0 ? <h1>Create your first Wallet</h1> : <></>}
    </>
  );
}

export default WalletTab;
