import { ApiConfig } from '../apiConfig/apiConfig';
import { ApiCallPost } from '../apiConfig/apiCall';
import { ConsoleLogs } from '../../utils/ConsoleLogs';

const TAG = 'HomeService';

const HomeService = {

  getUserData: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, userData } = ApiConfig;

    const url = baseUrl + userData;

    const params = {
    };

    ConsoleLogs(TAG + ', getUserData', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addPersonalInfo: async (firstName, lastName, infoDob, infoCountry) => {
    const token = localStorage.getItem("token");
    const { baseUrl, personalInfo } = ApiConfig;

    const url = baseUrl + personalInfo;

    const params = {
      fname: firstName,
      lname: lastName,
      dob: infoDob,
      country: infoCountry,
    };

    ConsoleLogs(TAG + ', addPersonalInfo', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addResidentialAddress: async (line1, line2, city, zipcode, resCountry) => {
    const token = localStorage.getItem("token");
    const { baseUrl, residentialInfo } = ApiConfig;

    const url = baseUrl + residentialInfo;

    const params = {
      line1,
      line2,
      city,
      zipcode,
      r_country: resCountry
    };

    ConsoleLogs(TAG + ', addResidentialAddress', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addMobileNo: async (code, number) => {
    const token = localStorage.getItem("token");
    const { baseUrl, addmobileno } = ApiConfig;

    const url = baseUrl + addmobileno;

    const params = {
      code,
      number,
    };

    ConsoleLogs(TAG + ', addMobileNo', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addIdentity: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseUrl, identity } = ApiConfig;

    const url = baseUrl + identity;

    ConsoleLogs(TAG + ', addIdentity', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token
    };

    return ApiCallPost(url, formData, headers);
  },

  addSelfie: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseUrl, selfie } = ApiConfig;

    const url = baseUrl + selfie;

    ConsoleLogs(TAG + ', addSelfie', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token
    };

    return ApiCallPost(url, formData, headers);
  },

  requestVerification: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, kycreuqestsent } = ApiConfig;

    const url = baseUrl + kycreuqestsent;

    const params = {};

    ConsoleLogs(TAG + ', requestVerification', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  updateGeneralSettings: async (nickName, timeZone, password) => {
    const token = localStorage.getItem("token");
    const { baseUrl, generalSettings } = ApiConfig;

    const url = baseUrl + generalSettings;

    const params = {
      nickname: nickName,
      timezone: timeZone,
      password: password,
    };

    ConsoleLogs(TAG + ', updateGeneralSettings', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  changePassword: async (oldPassword, newPassword, confirmNewPassword) => {
    const token = localStorage.getItem("token");
    const { baseUrl, changePassword } = ApiConfig;

    const url = baseUrl + changePassword;

    const params = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      cPassword: confirmNewPassword,
    };

    ConsoleLogs(TAG + ', changePassword', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

    return ApiCallPost(url, params, headers);
  },

  getRecentActivity: async () => {
    const token = localStorage.getItem("token");
    const { baseTrans, loginList } = ApiConfig;

    const url = baseTrans + loginList;

    const params = {};

    ConsoleLogs(TAG + ', getRecentActivity', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  generateGoogleCode: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, generateGoogleCode } = ApiConfig;

    const url = baseUrl + generateGoogleCode;

    const params = {};

    ConsoleLogs(TAG + ', generateGoogleCode', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  verifyCode: async (authCode) => {
    const token = localStorage.getItem("token");
    const { baseUrl, verifyCode } = ApiConfig;

    const url = baseUrl + verifyCode;

    const params = {
      code: authCode,
    };

    ConsoleLogs(TAG + ', verifyCode', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addWhiteList: async (address, coinType, name) => {
    const token = localStorage.getItem("token");
    const { baseUrl, whiteList } = ApiConfig;

    const url = baseUrl + whiteList;

    const params = {
      whitelistAddress: address,
      coinType,
      name,
    };

    ConsoleLogs(TAG + ', addWhiteList', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  getWhiteList: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, whitelistdata } = ApiConfig;

    const url = baseUrl + whitelistdata;

    const params = {};

    ConsoleLogs(TAG + ', getWhiteList', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  deleteWhiteList: async (addressId, userId) => {
    const token = localStorage.getItem("token");
    const { baseUrl, deleteWhiteList } = ApiConfig;

    const url = baseUrl + deleteWhiteList;

    const params = {
      address_id: addressId,
      userId,
    };

    ConsoleLogs(TAG + ', deleteWhiteList', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  getAccountData: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, accountList } = ApiConfig;

    const url = baseWallet + accountList;

    const params = {};

    ConsoleLogs(TAG + ', getAccountData', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  activeOrder: async (infoPlaceOrder, price, quantity, fcoin, scoin, orderType) => {
    const token = localStorage.getItem("token");
    const { baseUrl, addOrder } = ApiConfig;
    const url = baseUrl + addOrder;
    const params = {

      infoPlaceOrder,
      price,
      quantity,
      fcoin,
      scoin,
      orderType
    };

    ConsoleLogs(TAG + ', activeOrder', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getActiveOrders: async (fcoin, scoin) => {
    const token = localStorage.getItem("token");
    const { baseUrl, openOrders } = ApiConfig;

    const url = baseUrl + openOrders;

    const params = {
      fcoin,
      scoin
    };

    ConsoleLogs(TAG + ', openOrders', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getCompleteOrders: async (fcoin, scoin) => {
    const token = localStorage.getItem("token");
    const { baseUrl, completedOrders } = ApiConfig;

    const url = baseUrl + completedOrders;

    const params = {
      fcoin,
      scoin
    };

    ConsoleLogs(TAG + ', completeOrder', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  // depositAmount: async () => {
  //   const token = localStorage.getItem("token");
  //   const { baseWallet, deposit } = ApiConfig;

  //   const url = baseWallet + deposit;

  //   const params = {};

  //   ConsoleLogs(TAG + ', depositAmount', `url : ' + ${url}`);

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': token
  //   };

  //   return ApiCallPost(url, params, headers);
  // },

  withdrawlAmount: async (wallet_Add, amount_val, coinId) => {
    const token = localStorage.getItem("token");
    const { baseWallet, sendOther } = ApiConfig;

    const url = baseWallet + sendOther;

    const params = {
      addr: wallet_Add,
      amount: amount_val,
      coinId: coinId,
    };


    ConsoleLogs(TAG + ', sendOther', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  transferAmount: async (fromWallet, toWallet, amount, amountType) => {
    const token = localStorage.getItem("token");
    const { baseUrl, transferAmount } = ApiConfig;

    const url = baseUrl + transferAmount;

    const params = {
      fromWallet,
      toWallet,
      amount,
      amountType
    };

    ConsoleLogs(TAG + ', transferAmount', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  getCoinBal: async (coinId) => {
    const token = localStorage.getItem("token");
    const { baseUrl, getBalbycoin } = ApiConfig;

    const url = baseUrl + getBalbycoin;

    const params = {
      coinId
    };

    ConsoleLogs(TAG + ', getCoinBal', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  deleteActiveOrder: async (odId, odtype) => {
    const token = localStorage.getItem("token");
    const { baseUrl, cancelorder } = ApiConfig;

    const url = baseUrl + cancelorder;

    const params = {
      odId,
    };

    ConsoleLogs(TAG + ', deleteOrder', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getTransactions: async () => {
    const token = localStorage.getItem("token");
    const { baseTrans, userTransactions } = ApiConfig;

    const url = baseTrans + userTransactions;

    const params = {};

    ConsoleLogs(TAG + ', getTransactions', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, helplistUser } = ApiConfig;

    const url = baseUrl + helplistUser;

    const params = {};

    ConsoleLogs(TAG + ', getHistory', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addHelp: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseHelp, help } = ApiConfig;

    const url = baseHelp + help;

    ConsoleLogs(TAG + ', addHelp', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    };

    return ApiCallPost(url, formData, headers);
  },

  getMarketTrades: async (fcoin, scoin) => {
    const token = localStorage.getItem("token");
    const { baseUrl, getAllCompleteorders } = ApiConfig;

    const url = baseUrl + getAllCompleteorders;

    const params = {
      fcoin,
      scoin,
    };

    ConsoleLogs(TAG + ', getAllCompleteorders', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getAllActiveOrderBuy: async (fcoin, scoin) => {
    const token = localStorage.getItem("token");
    const { baseUrl, allPendingBuy } = ApiConfig;

    const url = baseUrl + allPendingBuy;

    const params = {
      fcoin,
      scoin,
    };

    ConsoleLogs(TAG + ', getAllActiveOrderBuy', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getAllActiveOrderSell: async (fcoin, scoin) => {
    const token = localStorage.getItem("token");
    const { baseUrl, allPendingSell } = ApiConfig;

    const url = baseUrl + allPendingSell;

    const params = {
      fcoin,
      scoin,
    };

    ConsoleLogs(TAG + ', getAllActiveOrderBuy', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  addBankDetails: async (BankName, AccNum, AccHolder, Ifsc, BranchName) => {
    const token = localStorage.getItem("token");
    const { baseKyc, bankdetails } = ApiConfig;

    const url = baseKyc + bankdetails;

    const params = {
      BankName: BankName,
      AcNumber: AccNum,
      HolderName: AccHolder,
      ifsc: Ifsc,
      Branch: BranchName,
    };

    ConsoleLogs(TAG + ', addBankDetails', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getTradeHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, tradeHistory } = ApiConfig;

    const url = baseUrl + tradeHistory;

    const params = {};

    ConsoleLogs(TAG + ', getTradeHistory', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  getAccountTotalBal: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, walletTotalBalance } = ApiConfig;

    const url = baseUrl + walletTotalBalance;

    const params = {};

    ConsoleLogs(TAG + ', getAccountTotalBal', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token
    };

    return ApiCallPost(url, params, headers);
  },

  addPanCard: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseUrl, pancard } = ApiConfig;

    const url = baseUrl + pancard;

    ConsoleLogs(TAG + ', pancard', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token
    };

    return ApiCallPost(url, formData, headers);
  },

  getCurrencyPreference: async (coinTp) => {
    const token = localStorage.getItem("token");
    const { baseKyc, currencyPreference } = ApiConfig;

    const url = baseKyc + currencyPreference;

    const params = {
      currency: coinTp,
    };

    ConsoleLogs(TAG + ', getTradeHistory', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getBankDetails: async () => {
    const token = localStorage.getItem("token");
    const { baseKyc, getBankDetails } = ApiConfig;

    const url = baseKyc + getBankDetails;

    const params = {};

    ConsoleLogs(TAG + ', getTransactions', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  depositAmountInr: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseWallet, depositInr } = ApiConfig;
    const url = baseWallet + depositInr;
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    };
    return ApiCallPost(url, formData, headers);
  },

  withdrawlAmountInr: async (withdrawAmount) => {
    const token = localStorage.getItem("token");
    const { baseWallet, withdrawInr } = ApiConfig;

    const url = baseWallet + withdrawInr;

    const params = {
      amount: withdrawAmount,
    };


    ConsoleLogs(TAG + ', withdrawlAmountInr', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getHelpList: async () => {
    const token = localStorage.getItem("token");
    const { baseHelp, helpList } = ApiConfig;

    const url = baseHelp + helpList;

    const params = {};

    ConsoleLogs(TAG + ', helpList', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  totalBalance: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, totalBalance } = ApiConfig;

    const url = baseWallet + totalBalance;

    const params = {};

    ConsoleLogs(TAG + ', totalBalance', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  update2fa: async (authType) => {
    const token = localStorage.getItem("token");
    const { baseUrl, update2fa } = ApiConfig;

    const url = baseUrl + update2fa;

    const params = {
      type: authType,
    };

    ConsoleLogs(TAG + ', getTradeHistory', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getNotifications: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, notify } = ApiConfig;

    const url = baseUrl + notify;

    const params = {};

    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getChain: async (selectedCurrency) => {
    const token = localStorage.getItem("token");
    const { baseWallet, getChain } = ApiConfig;

    const url = baseWallet + getChain;

    const params = {
      coinType: selectedCurrency,
    };

    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getFee: async (selectedCurrency) => {
    const token = localStorage.getItem("token");
    const { baseWallet, getFee } = ApiConfig;

    const url = baseWallet + getFee;

    const params = {
      coinType: selectedCurrency,
    };

    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getDetails: async () => {
    const token = localStorage.getItem("token");
    const { baseKyc, getDetails } = ApiConfig;

    const url = baseKyc + getDetails;

    const params = {};

    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  addkyc: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseKyc, identity } = ApiConfig;

    const url = baseKyc + identity;

    ConsoleLogs(TAG + ', addIdentity', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    };

    return ApiCallPost(url, formData, headers);
  },
  googleAuth: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, googleAuth } = ApiConfig;

    const url = baseUrl + googleAuth;

    const params = {
    };

    ConsoleLogs(TAG + ', googleAuth', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getOtp: async (email) => {

    const { baseUrl, getOtp } = ApiConfig;

    const url = baseUrl + getOtp;

    const params = {
      signId: email,

    };

    ConsoleLogs(TAG + ', getOtp', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', getOtp',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  addFavourite: async (cid, type) => {
    const token = localStorage.getItem("token");
    const { baseUrl, addFavourite } = ApiConfig;

    const url = baseUrl + addFavourite;

    const params = {
      _id: cid,
      type: type,
    };

    ConsoleLogs(TAG + ', addFavourite', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

    return ApiCallPost(url, params, headers);
  },

  getFavouriteList: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, getFavouriteList } = ApiConfig;

    const url = baseUrl + getFavouriteList;

    const params = {
    };

    ConsoleLogs(TAG + ', getFavouriteList', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  updateSettings: async (formData) => {
    const token = localStorage.getItem("token");
    const { baseAuth, updateSettings } = ApiConfig;

    const url = baseAuth + updateSettings;

    ConsoleLogs(TAG + ', updateSettings', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    };

    return ApiCallPost(url, formData, headers);
  },

  referralLink: async () => {
    const token = localStorage.getItem("token");
    const { baseKyc, referalcode } = ApiConfig;
    const url = baseKyc + referalcode;
    const params = {};

    ConsoleLogs(TAG + ', getreferalcodelist', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  referralData: async () => {
    const token = localStorage.getItem("token");
    const { baseKyc, referrallist } = ApiConfig;
    const url = baseKyc + referrallist;
    const params = {};

    ConsoleLogs(TAG + ', getReferrallist', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  referralAmount: async () => {
    const token = localStorage.getItem("token");
    const { baseKyc, referralAmount } = ApiConfig;
    const url = baseKyc + referralAmount;
    const params = {};

    ConsoleLogs(TAG + ', referralAmount', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

 /*  selectedChains: async (selectedChain, selectedCurrency) => {
    const token = localStorage.getItem("token");
    const { baseWallet, selectedChains } = ApiConfig;

    const url = baseWallet + selectedChains;

    const params = {
      type: selectedCurrency,
      chain: selectedChain,
    };

    ConsoleLogs(TAG + ', selectedChain', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  }, */

};

export default HomeService;
