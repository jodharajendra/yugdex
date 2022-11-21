import { ApiConfig } from "../apiConfig/apiConfig"
import { ApiCallPost } from "../apiConfig/apiCall"
import { ConsoleLogs } from "../../utils/ConsoleLogs";

const TAG = 'AuthService';

const AuthService = {
  /**
  * calling login api
  * @param email user email
  * @param password user password
  **/
  login: async (signId, password, otp) => {
    const { baseUrl, login } = ApiConfig;
    const url = baseUrl + login;
    const params = {
      signId: signId,
      password: password,
      motp: otp,
    };
    ConsoleLogs(TAG + ', login', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', login',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },

  register: async (countryCode, signId, firstName, lastName, password, invitation, otp) => {
    const { baseUrl, register } = ApiConfig;
    const url = baseUrl + register;
    const params = {
      cid: countryCode,
      signId: signId,
      password: password,
      referal: invitation,
      motp: otp,
      firstName: firstName,
      lastName: lastName,
    };
    ConsoleLogs(TAG + ', register', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', register',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },

  getCode: async (vCode, otp, user_Id, first, last, emailId) => {
    const { baseUrl, getcode } = ApiConfig;
    const url = baseUrl + getcode;
    const params = {
      emailId: emailId,
      otpType: otp,
      motp: vCode,
      userId: user_Id,
      firstName: first,
      lastName: last,

    };

    ConsoleLogs(TAG + ', forgotpassword', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', forgotpassword',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  getCode2: async (signid) => {
    const { baseAuth, getOtp } = ApiConfig;
    const url = baseAuth + getOtp;

    const params = {
      signId: signid,
      type: 'forgot',
    };

    ConsoleLogs(TAG + ', forgotpassword', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', forgotpassword',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  getOtp: async (signid) => {
    const { baseAuth, getOtp } = ApiConfig;
    const url = baseAuth + getOtp;

    const params = {
      signId: signid,
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



  forgotPassword: async (signId, otp, password, cPassword) => {
    const { baseUrl, forgotpassword } = ApiConfig;

    const url = baseUrl + forgotpassword;

    const params = {
      signId: signId,
      motp: otp,
      newPassword: password,
    };

    ConsoleLogs(TAG + ', forgotpassword', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', forgotpassword',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  verifyId: async (id) => {
    const { baseUrl, verifyId } = ApiConfig;

    const url = baseUrl + verifyId;

    const params = {
      hex: id,
    };

    ConsoleLogs(TAG + ', verifyId', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', verifyId',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  emailVerify: async (id) => {
    const { baseUrl, emailVerify } = ApiConfig;

    const url = baseUrl + emailVerify;

    const params = {
      hex: id,
      type: "signup",
    };

    ConsoleLogs(TAG + ', emailVerify', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', emailVerify',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },
  resetPassword: async (newPassword, rePassword, id) => {
    const { baseUrl, resetPassword } = ApiConfig;

    const url = baseUrl + resetPassword;

    const params = {
      newpass: newPassword,
      confpass: rePassword,
      hex: id,
    };

    ConsoleLogs(TAG + ', resetPassword', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', resetPassword',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },

  support: async (name, email, phone, subj, desc) => {
    const { baseUrl, support } = ApiConfig;

    const url = baseUrl + support;

    const params = {
      name: name,
      email: email,
      phone: phone,
      sub: subj,
      desc: desc
    };

    ConsoleLogs(TAG + ', support', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', support',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },
  otpVerify: async (otp, userId, emailId, first, last, type) => {

    const { baseUrl, otpVerify } = ApiConfig;

    const url = baseUrl + otpVerify;

    const params = {
      userId: userId,
      emailId: emailId,
      firstName: first,
      lastName: last,
      motp: otp,
      otp: true,
      otpType: type,
    };

    ConsoleLogs(TAG + ', otpVerify', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', otpVerify',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );

    const headers = {
      'Content-Type': 'application/json',
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

  addBankDetails: async (accountType, bankName, holderName, accountNumber, ifscCode, branchAddress) => {
    const token = localStorage.getItem("token");
    const { baseKyc, addBankDetails } = ApiConfig;

    const url = baseKyc + addBankDetails;

    const params = {
      accountType: accountType,
      BankName: bankName,
      HolderName: holderName,
      AcNumber: accountNumber,
      ifsc: ifscCode,
      Branch: branchAddress
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

  googleAuth: async (authType) => {
    const token = localStorage.getItem("token");
    const { baseAuth, googleAuth } = ApiConfig;

    const url = baseAuth + googleAuth;

    const params = {
      type: authType,
    };

    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  update2fa: async (authType, code) => {
    const token = localStorage.getItem("token");
    const { baseAuth, update2fa } = ApiConfig;

    const url = baseAuth + update2fa;

    const params = {
      type: authType,
      otp: code,
    };

    ConsoleLogs(TAG + ', update2fa', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  setCurrency: async (currencyType) => {
    const token = localStorage.getItem("token");
    const { baseKyc, setCurrency } = ApiConfig;

    const url = baseKyc + setCurrency;

    const params = {
      currency: currencyType,
    };

    ConsoleLogs(TAG + ', setCurrency', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  setSecurity: async (oldpassword, password, conPassword) => {
    const token = localStorage.getItem("token");
    const { baseAuth, setSecurity } = ApiConfig;

    const url = baseAuth + setSecurity;

    const params = {
      oldPassword: oldpassword,
      newPassword: password,
      cPassword: conPassword,
    };

    ConsoleLogs(TAG + ', setSecurity', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getActivityLogs: async () => {
    const token = localStorage.getItem("token");
    const { baseTrans, activityLogs } = ApiConfig;

    const url = baseTrans + activityLogs;

    const params = {};

    ConsoleLogs(TAG + ', activityLogs', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getTransHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseTrans, thistory } = ApiConfig;

    const url = baseTrans + thistory;

    const params = {};

    ConsoleLogs(TAG + ', thistory', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getUserfunds: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, userfunds } = ApiConfig;

    const url = baseWallet + userfunds;

    const params = {};

    ConsoleLogs(TAG + ', userfunds', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  Estimatedportfolio: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, estimatedportfolio } = ApiConfig;

    const url = baseWallet + estimatedportfolio;

    const params = {
    };

    ConsoleLogs(TAG + ', estimatedportfolio', `url : ' + ${url}`);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

  getIfscDetails: async (ifscCode) => {
    const token = localStorage.getItem("token");

    const { baseKyc, checkifsc } = ApiConfig;
    const url = baseKyc + checkifsc;
    const params = {
      ifsc: ifscCode,
    };
    ConsoleLogs(TAG + ', getIfscDetails', `url : ' + ${url}`);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  Contactus: async (name, email, mobileNumber, subject, message) => {
    const token = localStorage.getItem("token");

    const { baseAuth, Contactform } = ApiConfig;
    const url = baseAuth + Contactform;
    const params = {
      name: name,
      email: email,
      phone: mobileNumber,
      sub: subject,
      desc: message,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getTredingReport: async (tradingReport) => {
    const token = localStorage.getItem("token");
    const { baseKyc, tradeReportDate } = ApiConfig;
    const url = baseKyc + tradeReportDate;
    const params = {
      reportDate: tradingReport,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

}

export default AuthService;