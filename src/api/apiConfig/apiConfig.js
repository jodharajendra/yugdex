const appUrl = 'https://api.yugdex.com';

export const ApiConfig = {
  // =========EndPoints==========
  getcode: "auth/checkotp",
  getOtp: "getcode",
  login: 'auth/login',
  identity: "submitkyc",
  forgotpassword: 'auth/forgot',
  verifyId: 'auth/verifyHex',
  resetPassword: 'auth/changeFpass',
  support: "auth/setsupport",
  register: "auth/signup",
  emailVerify: "auth/verifyHex",
  openOrders: 'exch/openOrders',
  completedOrders: 'exch/completedOrders',
  getAllCompleteorders: 'exch/getallCompleteorders',
  allPendingSell: 'exch/allPendingSell',
  allPendingBuy: 'exch/allPendingBuy',
  getBalbycoin: 'wallet/getbalbycoin',
  addOrder: 'exch/addorder',
  cancelorder: 'exch/cancelorder',
  // changePassword: 'auth/changepass',
  // help: 'createhelp',
  // loginList: 'logs',
  userfunds: 'user_account',
  addBankDetails: "accdetails",
  depositInr: "depositInr",
  // withdrawInr: "withdrawinr",
  // helpList: "getHelplist",
  estimatedportfolio: "getTotalBal",
  update2fa: "update2fa",
  // otpVerify: "auth/checkotp",
  // notify: "acc/getnotification",
  getChain: "getchain",
  getFee: "getfee",
  getDetails: "getdetails",
  // identity: "submitkyc",
  googleAuth: "getgauthqr",
  // getOtp: "auth/getcode",
  setCurrency: 'setCurrency',
  setSecurity: 'changepass',
  activityLogs: 'logs',
  thistory: 'transactions',
  addFavourite: "exch/addfavcoin",
  getFavouriteList: "exch/getallfavcoin",
  inrwithdrawreq: 'inrwithdrawreq',
  withdrawcoin: 'withdrawcp',
  withdrawInr: 'withdrawInr',
  checkifsc: 'checkifsc',
  Contactform: 'setsupport',
  updateSettings: "setprofile",
  referalcode: "referalcode",
  referrallist: "totalrefer",
  referralAmount: 'totalrewards',
  selectedChains: "generateadr",
  tradeReportDate:'tradeReportDate',
  sendOther:'sendOther',
  getreceive:'getreceive',
  // ============URLs================
  baseUrl: `${appUrl}/`,
  appUrl: `${appUrl}/`,
  baseKyc: `${appUrl}/kyc/`,
  baseAuth: `${appUrl}/auth/`,
  baseTrans: `${appUrl}/tran/`,
  baseHelp: `${appUrl}/help/`,
  baseWallet: `${appUrl}/wallet/`,
  baseOrder: `${appUrl}/binance/`,
/*   webSocketUrl: 'ws://128.199.17.151:3004', */
  webSocketUrl: 'wss://api.yugdex.com',

};