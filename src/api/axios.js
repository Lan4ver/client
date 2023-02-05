import axios from "axios";
const BASE_URL = "https://money-manager-228.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { " Content-Type": "application/json" },
//   withCredentials: true,
// });
