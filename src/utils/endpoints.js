import moment from "moment";

export const postLogin =
  "https://money-manager-228.herokuapp.com/account/authorize";
export const postRegister =
  "https://money-manager-228.herokuapp.com/account/register";
export const postTransaction =
  "https://money-manager-228.herokuapp.com/cost/add";
export const getTransaction =
  "https://money-manager-228.herokuapp.com/cost/all";
export const getCostType =
  "https://money-manager-228.herokuapp.com/cost/type/all";
export const postNewIncome =
  "https://money-manager-228.herokuapp.com/income/add";
export const getAllIncome =
  "https://money-manager-228.herokuapp.com/income/all";
export const getTotal =
  "https://money-manager-228.herokuapp.com/statistic/balance";
export const postNewWallet =
  "https://money-manager-228.herokuapp.com/wallet/add";
export const getAllWallets =
  "https://money-manager-228.herokuapp.com/wallet/all";
export const getAllFromWallets =
  "https://money-manager-228.herokuapp.com/wallet/all/details";
export const getCurrency =
  "https://money-manager-228.herokuapp.com/currency/all";

export const getWalletStatistic = (walletId) => {
  return `https://money-manager-228.herokuapp.com/statistic/items?dateFrom=${moment()
    .startOf("month")
    .toJSON()}&dateTo=${moment().endOf("month").toJSON()}&walletId=${walletId}`;
};
export const getAllStatistic = () => {
  return `https://money-manager-228.herokuapp.com/statistic/items?dateFrom=${moment()
    .startOf("month")
    .toJSON()}&dateTo=${moment().endOf("month").toJSON()}`;
};
export const deleteIncome = (incomeId) => {
  return `https://money-manager-228.herokuapp.com/income/delete?incomeId=${incomeId}`;
};
export const deleteTransaction = (costId) => {
  return `https://money-manager-228.herokuapp.com/cost/delete?costId=${costId}`;
};
export const deleteWallet = (walletId) => {
  return `https://money-manager-228.herokuapp.com/wallet/delete?walletId=${walletId}`;
};
export const getStatistic = () => {
  return `https://money-manager-228.herokuapp.com/statistic/transactions/all?dateFrom=${moment()
    .startOf("month")
    .toJSON()}&dateTo=${moment().endOf("month").toJSON()}`;
};
export const getIncome = (walletId) => {
  return `https://money-manager-228.herokuapp.com/income?walletId=${walletId}`;
};
export const getWalletTransaction = (walletId) => {
  return `https://money-manager-228.herokuapp.com/statistic/transactions/all?dateFrom=${moment()
    .startOf("month")
    .toJSON()}&dateTo=${moment().endOf("month").toJSON()}&walletId=${walletId}`;
};
export const getAllTransaction = () => {
  return `https://money-manager-228.herokuapp.com/statistic/transactions/all?dateFrom=${moment()
    .startOf("month")
    .toJSON()}&dateTo=${moment().endOf("month").toJSON()}`;
};
