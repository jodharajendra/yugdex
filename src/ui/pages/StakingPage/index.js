import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { address, abi } from "../../../config";
import { $ } from "react-jquery-plugin";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { useProvider, useSigner } from "wagmi";
import AuthService from "../../../api/services/AuthService";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const StakingPage = () => {

  // const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [unStakeIndex, setUnstakeIndex] = useState('0');
  const [userAllowance, setUserAllowance] = useState('');
  const [coinAmount, setCoinAmount] = useState('')
  const [smartContractPlan, setSmartContractPlan] = useState('0')
  const [transactionHash, setTransactionHash] = useState('')
  const [transactionForm, setTransactionForm] = useState('')
  const [transactionTo, setTransactionTo] = useState('')
  const [transactionStatus, setTransactionStatus] = useState('')
  const [stackingDetails, setStackingDetails] = useState('')

  const [stakingBalance, setStakingBalance] = useState('')
  const [totalRewards, setTotalRewards] = useState('')
  const [allDetails, setAllDetails] = useState([])
  const [allStackingBalance, setsAllStackingBalance] = useState([])
  const [allStackingReward, setsAllStackingReward] = useState([])
  const [stakingDate, SetStakingDate] = useState([]);
  const [totalRamt, SetTotalRamt] = useState([]);
  const [totalEarnAmnt, SetTotalEarnAmnt] = useState([]);
  const [poolId, SetPoolId] = useState([]);



  useEffect(() => {
    details();
    handleStackingDetails();
  }, [])

  const signer = useProvider()
  const { data: _signer } = useSigner()
  let web3;

  // const provider = new ethers.providers.Web3Provider(_provider)
  // const provider = new ethers.providers.Web3Provider(window.ethereum)

  if (window.ethereum) {

    web3 = new Web3(window.ethereum)
  }
  else {

    web3 = new Web3((_signer?.provider))
  }

  const stakingAddress = address.stakeAddress
  const stakingAbi = abi.stakeAbi

  const tokenAddress = address.token
  const tokenAbi = abi.tokenAbi

  // const token = new ethers.Contract(tokenAddress, tokenAbi, signer)
  // const stake = new ethers.Contract(stakingAddress, stakingAbi, signer)

  const stakeContract = new web3.eth.Contract(stakingAbi, stakingAddress)
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)





  const checkAllowance = async () => {
    try {
      let accounts = await web3.eth.getAccounts()
      let user = accounts[0]

      // const address = signer.getAddress()
      let allowance = await tokenContract.methods.allowance(user, stakingAddress).call()
      // allowance = parseInt(allowance, 10)
      allowance = allowance / 10 ** 18
      setUserAllowance(allowance);
      console.log(allowance, 'allowance')
      // return allowance
    } catch (error) {
      console.log(error);
    }

  }


  // console.log(userAllowance, 'userAllowance');

  const approveStakingContract = async (amount) => {
    $('#stake_modal').modal('hide');
    // const address = signer.getAddress()
    let accounts = await web3.eth.getAccounts()
    let user = accounts[0]


    let decimal = await tokenContract.methods.decimals().call()
    // decimal = parseInt(decimal, 10)

    amount = amount * 10 ** decimal
    let amountInHex = "0x" + amount.toString(16)

    const tx = await tokenContract.methods.approve(stakingAddress, amountInHex).send({ from: user })

    console.log(tx, 'TXRAJENDRA');

    setTransactionHash(tx?.hash);
    setTransactionForm(tx?.from);
    setTransactionTo(tx?.to);
    setTransactionStatus(tx?.status);
    details();
    if (tx?.transactionHash) {
      handleStacking(coinAmount, smartContractPlan, tx?.transactionHash, tx?.from, tx?.to, tx?.status)
    } else {
      alertErrorMessage('Something Went Wrong')
    }

  }

  const stakeFunction = async (amount, poolId) => {
    $('#stake_modal').modal('hide');
    // const address = signer.getAddress()
    let accounts = await web3.eth.getAccounts()
    let user = accounts[0]

    let decimal = await tokenContract.methods.decimals().call()
    // decimal = parseInt(decimal, 10)
    amount = amount * 10 ** decimal
    // console.log(amount, "amount");
    // console.log(poolId, "pool");
    let amountInHex = "0x" + amount.toString(16)
    let poolInHex = "0x" + poolId.toString(16)
    const tx = await stakeContract.methods.stakeTokens(amountInHex, poolInHex).send({ from: user })
    console.log(tx, 'TXRAJENDRA');


    setTransactionHash(tx?.transactionHash);
    setTransactionForm(tx?.from);
    setTransactionTo(tx?.to);
    setTransactionStatus(tx?.status);
    details()
    if (tx?.transactionHash) {
      handleStacking(coinAmount, smartContractPlan, tx?.transactionHash, tx?.from, tx?.to, tx?.status)
    } else {
      alertErrorMessage('Something Went Wrong')
    }
  }

  const unstakeFunction = async (i) => {
    // const address = signer.getAddress()
    let accounts = await web3.eth.getAccounts()
    let user = accounts[0]

    let indexInHex = "0x" + i.toString(16)
    const tx = await stakeContract.methods.unstake(indexInHex).send({ from: user })

    console.log(tx, 'txtxUnstake');
  }

  const details = async () => {
    // const address = signer.getAddress()
    let accounts = await web3.eth.getAccounts()
    let user = accounts[0]

    const details = await stakeContract.methods.details(user).call();

    console.log(details, 'details');
    setStakingBalance(details?.amount[0]);
    setTotalRewards(details?.earnedAmt[0]);

    setAllDetails(details);
    setsAllStackingBalance(details[0])
    setsAllStackingReward(details[1])
    SetStakingDate(details[2])
    SetTotalRamt(details?.amount)
    SetTotalEarnAmnt(details?.earnedAmt)
    SetPoolId(details?.pool)
    return details
  }


  console.log(poolId[2], "pollId:")
  // let stackingBalance = allDetails[0]
  // let totalRewardss = allDetails[1]
  // let date = allDetails[2]
  // let blankArr = []







  const handleStacking = async (coinAmount, smartContractPlan, transactionHash, transactionForm, transactionTo) => {
    await AuthService.addStackingCoin(coinAmount, smartContractPlan, transactionHash, transactionForm, transactionTo).then(async result => {
      if (result.msg === 'Your Stacking Placed Successfully!!') {
        try {
          alertSuccessMessage(result.msg);
        } catch (error) {
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        alertErrorMessage(result.msg);
      }
    });
  }


  const handleStackingDetails = async () => {
    await AuthService.stackingList().then(async result => {
      if (result.success) {
        try {
          // alertSuccessMessage(result.msg);
          setStackingDetails(result?.success);
          handleSession(result)
        } catch (error) {
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        alertErrorMessage(result.message);
      }
    });
  }

  let totalAmnt = 0;

  for (let i = 0; i < totalRamt.length; i++) {
    totalAmnt += totalRamt[i] / 10 ** 18;
  }

  let totalpool = [];

  for (let i = 0; i < poolId.length; i++) {
    totalpool.push(poolId[i]);
  }

  let totalEarndAmnt = 0;

  for (let i = 0; i < totalEarnAmnt.length; i++) {
    totalEarndAmnt += totalEarnAmnt[i] / 10 ** 18;
  }

  console.log(totalEarndAmnt, 'totalEarndAmnt');

  let arr = [];
  let arrPlan = [];
  for (let i = 0; i < stakingDate.length; i++) {
    var a = new Date(stakingDate[i] * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    arr.push(time)
    arrPlan.push(i)
  }

  const handleSession = (result) => {
    if (result.message === "Unauthorized") {
      navigate("/login");
      sessionStorage.clear();
    }
  }


  // {arrPlan.map((item, index) =>



  console.log(totalpool, 'totalpool')

  // )}


  return (
    <>
      <section class="inner-page-banner">
        <div class="container">
          <div class="inner text-center">
            <h1 class="title">Staking</h1>
            <nav class="mt-4">
              <ol class="breadcrumb justify-content-center">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page"> Staking </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="" >
        <div className="container" >
          <div class="d-flex-between mb-5 stake_flex ">

            <div class="d-flex-between ">
              <div className="bidder" >

                <div className="d-flex-between " >


                  <span> TOTAL STAKING BALANCE: </span>
                  <div class="d-flex-center ms-1">
                    {/* <strong> <span class="text-white"> $ {parseFloat(stakingBalance / 10 ** 18)}</span></strong> */}
                    <strong> <span class="text-white"> {totalAmnt}  </span></strong>
                  </div>
                  <div class="d-flex-between ms-3">
                    <span>TOTAL REWARDS: </span>
                    <div class="d-flex-center ms-1">
                      <span class="text-white"><strong> {totalEarndAmnt} </strong></span>
                    </div>
                  </div>


                </div>


              </div>

              <div class="d-flex-center ms-1 bidder_action">
                <button className="btn btn-small btn-gradient" data-bs-toggle="modal" title="Stake" data-bs-target="#stake_modal" type="button" onClick={checkAllowance}> <span>Stake YUG</span> </button>
              </div>

            </div>






            <ConnectButton></ConnectButton>

            {/* <button onClick={details}>Details Button</button> */}
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead >
                <tr>

                  <th className="text-start" >Reward</th>
                  <th className="text-center"> Total Rewards</th>
                  <th className="text-center">Stacking Balance </th>
                  <th className="text-center">Staking Date </th>
                  <th className="text-center">Staking End Date </th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">
                    <div class="td_stack justify-content-center div_info  py-2">
                      {
                        totalpool.length > 0
                          ? totalpool.map((item) => (
                            <div>
                              {item == 0 ? '6%' : item == 1 ? '10%' : item == 2 ? '13%' : item == '3' ? '17%' :
                                null}
                            </div>

                          ))
                          : null
                      }
                    </div>
                  </td>


                  {/* <td className="text-end">1.00%</td> */}

                  <td className="text-center">
                    <div class="td_stack justify-content-center div_info  py-2">
                      {
                        allStackingReward.length > 0
                          ? allStackingReward.map((item) => (

                            <div>{parseFloat(item / 10 ** 18)}</div>

                          ))
                          : null
                      }
                    </div>
                  </td>
                  <td className="text-center">
                    <div class="td_stack justify-content-center div_info  py-2">
                      {
                        allStackingBalance.length > 0
                          ? allStackingBalance.map((item) => (

                            <div>{parseFloat(item / 10 ** 18)} {/* <small>YUG</small> */}</div>

                          ))
                          : null
                      }
                    </div>
                  </td>

                  <td className="text-center">
                    <div class="td_stack justify-content-center div_info  py-2">
                      {
                        arr.length > 0
                          ? arr.map((item) => (

                            <div>{item} {/* <small>YUG</small> */}</div>

                          ))
                          : null
                      }
                    </div>
                  </td>

                  <td className="text-center">
                    <div class="td_stack justify-content-center div_info  py-2">
                      {
                        arr.length > 0
                          ? arr.map((item) => (

                            <div>{item} {/* <small>YUG</small> */}</div>

                          ))
                          : null
                      }
                    </div>
                  </td>

                  <td className="text-end" >

                    {
                      allStackingBalance.length > 0
                        ? allStackingBalance.map((item) => (

                          <div className="d-flex align-items-center justify-content-end" >
                            <button type="button" class="tb_btn badge  m-0 btn  btn-unstake p-0" onClick={() => unstakeFunction(unStakeIndex)}>
                              Unstake
                            </button>
                          </div>

                        ))
                        :
                        null
                    }

                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* stake modal */}

      {/*       {

        transactionHash ? '' : */}





      <div class="modal fade" id="stake_modal" tabindex="-1" aria-labelledby="stake_modalLaebl" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          {
            userAllowance === '' ? <h5>Wait for Allowance</h5> :
              <div class="modal-content">
                <div class="modal-header flex-column px-8">
                  <h3 class="modal-title" id="placeBitLaebl">Stack Yugcoin</h3>
                  <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                    class="ri-close-fill"></i></button>
                </div>
                <div class="modal-body px-8 py-5">
                  <small className="text-end d-block mb-2" >
                    <span> Available Balance: </span>
                    <span className="mb-0 fw-bold">{stackingDetails?.totalAmount} YUG</span>
                  </small>
                  <div className="form-group position-relative mb-4" >
                    <label>Select plan</label>
                    <select className="input-select" value={smartContractPlan} onChange={(e) => setSmartContractPlan(e.target.value)}>
                      <option value='0'>Plan 1</option>
                      <option value='1'>Plan 2</option>
                      <option value='2'>Plan 3</option>
                      <option value='3'>Plan 4</option>
                    </select>
                  </div>
                  <div className="form-group position-relative" >
                    <label>Enter Amonut</label>


                    {/* {
                  coinAmount >= 30000 ? 'Maximum  Limit is 30000' : */}


                    <input type="text" className="form-control" placeholder="Enter Amount to Unstake"
                      value={coinAmount} onChange={(e) => setCoinAmount(e.target.value)} />
                    {/* } */}

                  </div>
                  <small className="d-flex-between mt-2 mb-4" >
                    <span>
                      Minimum to Stack
                    </span>
                    <p className="mb-0 fw-bold">3000 YUG</p>
                  </small>
                  <div className="row g-1 mt-3">
                    <div className="col-md-12 m-auto px-1">

                      {

                        coinAmount > 15000000 || coinAmount < 3000 ? <span style={{ color: 'red', fontSize: '14px' }}> Maximum Stacking 15000000 or Minimum Stacking 3000 Yug
                        </span> :



                          userAllowance >= coinAmount ?
                            <button type="button" class="btn btn-gradient w-100" onClick={() => stakeFunction(coinAmount, smartContractPlan)} disabled={!userAllowance}>
                              <span className="m-auto" >Stake </span>
                            </button>
                            :
                            <button type="button" class="btn btn-gradient w-100" onClick={() => approveStakingContract(coinAmount)} >
                              <span className="m-auto" >Approve Stacking </span>
                            </button>

                      }

                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
      </div>




      {/*  } */}
      {/* stake modal end */}

      {/* unstake modal */}
      <div class="modal fade" id="unstake_modal" tabindex="-1" aria-labelledby="unstake_modalLaebl" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header flex-column px-8">
              <h3 class="modal-title" id="placeBitLaebl">Unstake</h3>
              <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                class="ri-close-fill"></i></button>
            </div>
            <div class="modal-body px-8 py-5 text-center">
              <div className="form-group position-relative" >

                <input type="text" className="form-control" placeholder="Enter Amount to Unstake"
                  onChange={(event) => { setUnstakeIndex(event.target.value) }} value={unStakeIndex} />
                <img src="https://api.yugdex.com/uploads/icon/btc.png" class="img-fluid icon_img coinimg stake_in_icon " />
              </div>
              <div className="row g-1 mt-3">
                <div className="col-md-12 px-1">



                  <button type="button" class="btn btn-gradient w-100" onClick={() => unstakeFunction(unStakeIndex)}>
                    <span className="m-auto" >Submit </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* unstake modal end */}


    </>


  );
};

export default StakingPage;
