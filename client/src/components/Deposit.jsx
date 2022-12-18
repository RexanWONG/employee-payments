import React from 'react'
import { useState, useEffect } from 'react'
import { ethers, utils } from "ethers";
import abi from "../utils/Payments.json";
import truncateEthAddress from 'truncate-eth-address'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'


const Deposit = () => {
  const [employeeList, setEmployeeList] = useState([])
  const [inputValue, setInputValue] = useState({walletAddress: ""});

  const contractAddress = '0xe70BF5e936A5fDa0a93bC6644d53692660f734a0' 
  const contractABI = abi.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const paymentsContract = new ethers.Contract(contractAddress, contractABI, signer);

  const getEmployeeList = async () => {
    try {
      if (window.ethereum) {
        const employeeList = await paymentsContract.getEmployeeList()
        setEmployeeList(employeeList)
        console.log(employeeList)
      }
    } catch (error) {
      console.log(error)
    }

  }


  const depositSalary = async () => {
    try {
      if (window.ethereum) {
        const deposit = await paymentsContract.deposit(inputValue.walletAddress)
        console.log("Depositing")
        await deposit.wait()
        console.log("Deposited")
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  }

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold antialiased">
        Deposit 🚀
      </h1>
      <h2 className="text-2xl">
        Pay Employee Salary!
      </h2>
      <div className="p-5">
        <label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900">Enter Wallet Address</label>
        <input 
        type="text" 
        class="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " 
        onChange={handleInputChange}
        name="walletAddress"
        placeholder="0xBC96b0D8533408b22357Ca7478710D8763C40Fdc" 
        value={inputValue.walletAddress}
        />
      </div>
      <div className="p-5">
        <h1>Depositing Salary to {inputValue.walletAddress}</h1>
        <button onClick={depositSalary} type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb- ">
            <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
            Pay with Ethereum
        </button>
      </div>
     

  </div>
  )
}

export default Deposit