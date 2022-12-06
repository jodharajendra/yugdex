import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { address, abi } from "../../../config";
import { $ } from "react-jquery-plugin";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage, alertSuccessMessageTrade } from "../../../customComponent/CustomAlertMessage";
import { useSigner } from "wagmi";

const StakingPage = () => {

  const [selectedBuyPercent, setSelectedBuyPercent] = useState(25);
  const [selectedSellPercent, setSelectedSellPercent] = useState(25);
  const [changeTotal, setChangeTotal] = useState(false);
  const [buyTotal, setBuyTotal] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyCoinBal, setBuyCoinBal] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  const [userAllowance, setUserAllowance] = useState('');


  const [coinAmount, setCoinAmount] = useState('')

  const [smartContractPlan, setSmartContractPlan] = useState('0')
  const [transactionHash, setTransactionHash] = useState('')

  const [transactionForm, setTransactionForm] = useState('')

  const { data: _signer } = useSigner()

  // const provider = new ethers.providers.Web3Provider(_provider)
  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = _signer

  const stakingAddress = address.stakeAddress
  const stakingAbi = abi.stakeAbi

  const tokenAddress = address.token
  const tokenAbi = abi.tokenAbi

  const token = new ethers.Contract(tokenAddress, tokenAbi, signer)
  const stake = new ethers.Contract(stakingAddress, stakingAbi, signer)


  const selectBuyPercent = (percent) => {
    setSelectedBuyPercent(percent);
    let totalPrice = (buyCoinBal * percent) / 100;
    setBuyTotal(totalPrice);
    let amount = (totalPrice / buyPrice);
    setBuyAmount(amount);
  }

  const handleActiveOrder = async (buyPrice, buyAmount) => {

    // console.log(buyPrice, 'buyPrice');
    // console.log(buyAmount, 'buyPrice');

  };



  // const checkAllowance = async () => {

  //   if (!userAllowance) {
  //     LoaderHelper.loaderStatus(true);

  //   } else {
  //     LoaderHelper.loaderStatus(false);

  //     alert('checkAllowance')
  //     const address = signer.getAddress()
  //     let allowance = await token.allowance(address, stakingAddress)
  //     allowance = parseInt(allowance, 10)

  //     setUserAllowance(allowance);

  //     return allowance
  //   }
  // }

  const checkAllowance = async () => {
    const address = signer.getAddress()
    let allowance = await token.allowance(address, stakingAddress)
    allowance = parseInt(allowance, 10)
    allowance = allowance / 10 ** 18
    setUserAllowance(allowance);
    console.log("address: ",address)
    // return allowance
  }
  
  
  console.log(userAllowance, 'userAllowance');

  const approveStakingContract = async (amount) => {
    $('#stake_modal').modal('hide');
    const address = signer.getAddress()

    let decimal = await token.decimals()
    decimal = parseInt(decimal, 10)

    amount = amount * 10 ** decimal
    let amountInHex = "0x" + amount.toString(16)

    const tx = await token.approve(stakingAddress, amountInHex)
    setTransactionHash(tx?.hash);
    setTransactionForm(tx?.from);
    if (tx?.hash) {
      handleStacking(coinAmount, smartContractPlan, tx?.hash, tx?.from)
    } else {
      alertErrorMessage('Something Went Wrong')
    }

  }

  const stakeFunction = async (amount, poolId) => {
    $('#stake_modal').modal('hide');
    const address = signer.getAddress()
    let decimal = await token.decimals()
    decimal = parseInt(decimal, 10)
    amount = amount * 10 ** decimal
    console.log(amount, "amount");
    console.log(poolId, "pool");
    let amountInHex = "0x" + amount.toString(16)
    let poolInHex = "0x" + poolId.toString(16)
    const tx = await stake.stakeTokens(amountInHex, poolInHex, { gasLimit: 300000 })


    setTransactionHash(tx?.hash);
    setTransactionForm(tx?.from);
    if (tx?.hash) {
      handleStacking(coinAmount, smartContractPlan, tx?.hash, tx?.from)
    } else {
      alertErrorMessage('Something Went Wrong')
    }
  }

  const unstakeFunction = async (i) => {
    const address = signer.getAddress()
    let indexInHex = "0x" + i.toString(16)
    const tx = await stake.unstake(indexInHex, { gasLimit: 210000 })

    console.log(tx, 'txtxUnstake');
  }

  const details = async () => {
    const address = signer.getAddress()
    const details = await stake.details(address)
    
    console.log(details, "Details:")
    return details
  }


  useEffect(() => {
    details();
  },[])

  const handleStacking = async (coinAmount, smartContractPlan, transactionHash, transactionForm) => {

    console.log(transactionHash, 'transactionHash');
    console.log(transactionForm, 'transactionForm');
    console.log(coinAmount, 'amount');
    console.log(smartContractPlan, 'poolId');

  }




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
          <div class="d-flex-between mb-5">

            <div class="d-flex-between bidder">
              <span>STAKING BALANCE: </span>
              <div class="d-flex-center ms-1">
                <span class="text-white">$00.000</span>
              </div>
            </div>
            <div class="d-flex-between bidder">
              <span>TOTAL REWARDS: </span>
              <div class="d-flex-center ms-1">
                <span class="text-white">$00.000</span>
              </div>
            </div>
            <ConnectButton></ConnectButton>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead >
                <tr>
                  <th>ASSETS</th>
                  <th className="text-end" >Reward</th>
                  <th className="text-end"> Total Rewards</th>
                  <th className="text-end">Stacking Balance </th>
                  <th className="text-end">Value</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="td_div td_stack">
                      <img src="https://api.yugdex.com/uploads/icon/btc.png" class="img-fluid icon_img coinimg me-2 " />
                      <div>Yugcoin <br /> <small>YUG</small></div>
                    </div>
                  </td>
                  <td className="text-end">1.00%</td>
                  <td className="text-end">
                    <div class="td_div td_stack justify-content-end">
                      <div>0.00000000 <br /> <small>YUG</small></div>
                    </div>
                  </td>
                  <td className="text-end">0.00000</td>
                  <td className="text-end">
                    <div class="td_div td_stack justify-content-end">
                      <div>0.00000000 <br /> <small>YUG</small></div>
                    </div>
                  </td>
                  <td className="text-center" >
                    <a href="#" class="tb_btn badge btn-stake  " data-bs-toggle="modal" title="Stake" data-bs-target="#stake_modal" onClick={checkAllowance}>

                      <svg width="30" height="30" class="svg-icon" viewBox="0 0 24 24" fill="#F2AE26 " xmlns="http://www.w3.org/2000/svg"><path d="M6 13C6 12.5926 6.36925 11.9034 7.44721 11.3644L6.55279 9.57556C5.15075 10.2766 4 11.5075 4 13C4 13.1414 4.01013 13.278 4.02953 13.41H4V16.91C4 18.5056 5.293 19.5266 6.66188 20.1009C8.08997 20.7 9.98275 21 12 21C14.0172 21 15.91 20.7 17.3381 20.1009C18.707 19.5266 20 18.5056 20 16.91V13.41H19.9705C19.9899 13.278 20 13.1414 20 13C20 11.5075 18.8492 10.2766 17.4472 9.57556L16.5528 11.3644C17.6308 11.9034 18 12.5926 18 13C18 13.3229 17.7438 13.8277 16.5784 14.2959C15.4724 14.7403 13.8615 15 12 15C10.1385 15 8.52764 14.7403 7.42156 14.2959C6.25622 13.8277 6 13.3229 6 13ZM18 15.8375V16.91C18 17.2445 17.728 17.7684 16.5644 18.2566C15.46 18.72 13.8528 19 12 19C10.1472 19 8.54003 18.72 7.43562 18.2566C6.272 17.7684 6 17.2445 6 16.91V15.8375C6.21976 15.9552 6.44703 16.0597 6.67594 16.1517C8.10236 16.7248 9.99151 17 12 17C14.0085 17 15.8976 16.7248 17.3241 16.1517C17.553 16.0597 17.7802 15.9552 18 15.8375Z"></path><path d="M13 8.9978L15.5578 6.30676L17.0075 7.68465L11.9998 12.9531L6.99219 7.68465L8.44182 6.30676L11 8.99815V3H13V8.9978Z"></path></svg>
                    </a>
                    <a href="#" class="tb_btn badge btn-unstake " data-bs-toggle="modal" title="Unstake" data-bs-target="#unstake_modal" onClick={unstakeFunction}>
                      <svg width="30" height="30" class="svg-icon" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.45018 9.67033L10.9976 6.97259L10.9976 12.9983H12.9976V6.97179L15.5459 9.67033L17 8.2972L11.998 3.00015L6.99605 8.2972L8.45018 9.67033ZM7.44721 11.3007C6.36925 11.8432 6 12.5369 6 12.9471C6 13.2721 6.25622 13.7802 7.42156 14.2515C8.52764 14.6988 10.1385 14.9603 12 14.9603C13.8615 14.9603 15.4724 14.6988 16.5784 14.2515C17.7438 13.7802 18 13.2721 18 12.9471C18 12.5369 17.6308 11.8432 16.5528 11.3007L17.4472 9.49997C18.8492 10.2056 20 11.4446 20 12.9471C20 13.0894 19.9899 13.227 19.9705 13.3599H20V16.883C20 18.4891 18.707 19.5169 17.3381 20.095C15.91 20.6981 14.0172 21 12 21C9.98275 21 8.08997 20.6981 6.66188 20.095C5.293 19.5169 4 18.4891 4 16.883V13.3599H4.02954C4.01013 13.227 4 13.0894 4 12.9471C4 11.4446 5.15075 10.2056 6.55279 9.49997L7.44721 11.3007ZM17.3241 16.1196C17.553 16.027 17.7802 15.9218 18 15.8033V16.883C18 17.2196 17.728 17.7471 16.5644 18.2385C15.46 18.7049 13.8528 18.9868 12 18.9868C10.1472 18.9868 8.54003 18.7049 7.43562 18.2385C6.272 17.7471 6 17.2196 6 16.883V15.8033C6.21976 15.9218 6.44703 16.027 6.67594 16.1196C8.10236 16.6965 9.99151 16.9735 12 16.9735C14.0085 16.9735 15.8976 16.6965 17.3241 16.1196Z"></path></svg>
                    </a>
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
          <div class="modal-content">
            <div class="modal-header flex-column px-8">
              <h3 class="modal-title" id="placeBitLaebl">Stack Yugcoin</h3>
              <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                class="ri-close-fill"></i></button>
            </div>
            <div class="modal-body px-8 py-5">
              <small className="text-end d-block mb-2" >
                <span> Available Balance: </span>
                <span className="mb-0 fw-bold">0.000001 YUG</span>
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

                    coinAmount > 15000000 || coinAmount < 3000 ? <span style={{color:'red', fontSize:'14px' }}> Maximum Stacking 15000000 or Minimum Stacking 3000 Yug 
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
                  onChange={(event) => {
                    setChangeTotal(true);
                    setBuyTotal(event.target.value)
                  }}
                  value={buyTotal} />
                <img src="https://api.yugdex.com/uploads/icon/btc.png" class="img-fluid icon_img coinimg stake_in_icon " />
              </div>
              <div className="stak_amonut text-start mt-3" >
                <label className="mb-0" ><small>Staking balance:</small></label>
                <div
                  class="btn-group btn-group-mini my-2"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio125"
                    autocomplete="off"
                    checked={(selectedBuyPercent === 25)}
                  />
                  <label
                    class="btn btn-outline-primary"
                    for="btnradio125" onClick={() => selectBuyPercent(25)}
                  >
                    25%
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio250"
                    autocomplete="off"
                    checked={(selectedBuyPercent === 50)}
                  />
                  <label
                    class="btn btn-outline-primary"
                    for="btnradio250"
                    onClick={() => selectBuyPercent(50)}
                  >
                    50%
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio375"
                    autocomplete="off"
                    checked={(selectedBuyPercent === 75)}
                  />
                  <label
                    class="btn btn-outline-primary"
                    for="btnradio375"
                    onClick={() => selectBuyPercent(75)}
                  >
                    75%
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio3100"
                    autocomplete="off"
                    checked={(selectedBuyPercent === 100)}
                  />
                  <label
                    class="btn btn-outline-primary"
                    for="btnradio3100"
                    onClick={() => selectBuyPercent(100)}
                  >
                    100%
                  </label>
                </div>
              </div>
              <div className="row g-1 mt-3">
                <div className="col-md-6  px-1">
                  <a href="/aboutus" class="btn btn-gradient w-100"><span className="m-auto">Deposit </span></a>
                </div>
                <div className="col-md-6 px-1">

                  <button type="button" class="btn btn-gradient w-100" onClick={() => handleActiveOrder(buyTotal, selectedBuyPercent)}><span className="m-auto" >Buy </span></button>
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
