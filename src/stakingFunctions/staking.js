import { ethers } from "ethers";
import { address, abi } from "../config";



const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const stakingAddress = address.stakeAddress
const stakingAbi = abi.stakeAbi

const tokenAddress = address.token
const tokenAbi = abi.tokenAbi

const token = new ethers.Contract(tokenAddress, tokenAbi, signer)
const stake = new ethers.Contract(stakingAddress,stakingAbi, signer)

export const checkAllowance = async () => {
    const address = signer.getAddress()
    let allowance = await token.allowance(address, stakingAddress)
    allowance = parseInt(allowance, 10)
    return allowance
}

export const approveStakingContract = async (amount) => {
    const address = signer.getAddress()

    let decimal = await token.decimals()
    decimal = parseInt(decimal, 10)

    amount = amount * 10 ** decimal
   let amountInHex = "0x" + amount.toString(16)

    const tx = await token.approve(stakingAddress, amountInHex)
    console.log("approve tx: ",tx)
}

export const stakeFunction = async (amount, poolId) => {
    const address = signer.getAddress()

    let decimal = await token.decimals()
    decimal = parseInt(decimal, 10)

    amount = amount * 10 ** decimal
   let amountInHex = "0x" + amount.toString(16)

   let poolInHex = "0x" + poolId.toString(16)

    const tx = await stake.stakeTokens(amountInHex, poolInHex)
    console.log("stake tx: ", tx)
}