import "./App.css";
import axios from "axios";
import { getCurrency } from "./utils/endpoints";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./data/store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { setCurrentUser } from "./data/actionCreators/authorizationActions";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  var token = localStorage.getItem("jwtToken");
  const isAuthenticated = store.getState().authorization.isAuthenticated;

  if (token && !isAuthenticated) {
    setAuthorizationToken(token);
    axios.get(getCurrency).then((response) => {
      store.dispatch(setCurrentUser(token));
    });
  }

  return (
    <Provider store={store}>
      <Router>
        {isAuthenticated ? (
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </Router>
    </Provider>
  );
}

export default App;
