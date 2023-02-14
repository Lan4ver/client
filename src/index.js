import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./data/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

let renderTree = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

store.subscribe(renderTree);
renderTree(store.getState());
