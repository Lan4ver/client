import axios from "axios";
import { postRegister } from "../../utils/endpoints";

export function register(data) {
  return (dispatch) => {
    return axios.post(postRegister, data).then((res) => {
      console.log(res);
    });
  };
}
