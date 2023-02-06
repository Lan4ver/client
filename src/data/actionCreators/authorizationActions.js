import axios from "axios";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import { SET_CURRENT_USER } from "./types";
import { postLogin } from "../../utils/endpoints";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data, save) {
  return (dispatch) => {
    return axios.post(postLogin, data).then((res) => {
      const token = res.data.token;
      if (save) {
        localStorage.setItem("jwtToken", token);
      }
      setAuthorizationToken(token);
      dispatch(setCurrentUser(token));
    });
  };
}
