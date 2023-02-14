import React, { useRef, useState, useEffect } from "react";
import { Tabs, Modal, Input } from "antd";
import WalletComponent from "./WalletComponent";
import axios from "axios";
import { postNewWallet, getAllWallets, deleteWallet } from "../utils/endpoints";

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
            children: <WalletComponent wallet={item}></WalletComponent>,
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

  const remove = (targetKey) => {
    axios
      .delete(
        deleteWallet(
          items.find((pane) => pane.key === targetKey).children.props.wallet
            .walletId
        )
      )
      .catch((error) => {
        console.error(error);
      });
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
      axios
        .post(postNewWallet, {
          Name: walletName,
          CurrencyId: "1",
        })
        .then((res) => {
          const newActiveKey = `newTab${newTabIndex.current++}`;
          const newPanes = [...items];
          newPanes.push({
            label: walletName, //
            children: <WalletComponent wallet={res.data}></WalletComponent>,
            key: newActiveKey,
          });
          setItems(newPanes);
          setActiveKey(newActiveKey);
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
        title="Name wallet"
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
