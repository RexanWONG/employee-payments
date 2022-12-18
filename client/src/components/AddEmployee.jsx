import React from 'react'
import { useState, useEffect } from 'react'
import { ethers, utils } from "ethers";
import abi from "../utils/Payments.json";

const AddEmployee = () => {
  const [inputValue, setInputValue] = useState({walletAddress: "", firstName:"", lastName:"", salary: "", role:""});
  const [addHash, setAddHash] = useState("")
  
  const contractAddress = '0xe70BF5e936A5fDa0a93bC6644d53692660f734a0' 
  const contractABI = abi.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const paymentsContract = new ethers.Contract(contractAddress, contractABI, signer);

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();


  const addEmployee = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const add = await paymentsContract.addEmployee(
          (inputValue.walletAddress), 
          (inputValue.firstName), 
          (inputValue.lastName), 
          utils.parseEther(inputValue.salary), 
          (inputValue.role))

        console.log("Adding employee, wait a second...")
        await add.wait()
        console.log("Employee added : ", add.hash);

        const addHash = add.hash
        setAddHash(addHash)


      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  }


  return (
      <div>
        <div className="p-4">
          <h1 className="text-5xl font-bold antialiased">
            Add Employee ➕
          </h1>
          <h2 className="text-2xl">
            New address!
          </h2>
        </div>
        <div className="box-border h-80 w-70 border 4 rounded-lg bg-slate-200">
            <form className="flex flex-col border rounded-lg p-5 border-gray-600 justify-center">
              <h1>You will need to pay a bit in gas fee</h1>

              <input 
                type="text"
                className="px-1 py-2 input-double focus-within:ring-indigo-500 z-40"
                onChange={handleInputChange}
                name="walletAddress"
                placeholder="Wallet Address"
                value={inputValue.walletAddress}
              />
              <input 
                type="text"
                className="px-1 py-2 input-double focus-within:ring-indigo-500 z-40"
                onChange={handleInputChange}
                name="firstName"
                placeholder="First Name"
                value={inputValue.firstName}
              />
              <input 
                type="text"
                className="px-1 py-2 input-double focus-within:ring-indigo-500 z-40"
                onChange={handleInputChange}
                name="lastName"
                placeholder="Last Name"
                value={inputValue.lastName}
              />
              <input 
                type="number"
                className="px-1 py-2 input-double focus-within:ring-indigo-500 z-40"
                onChange={handleInputChange}
                name="salary"
                placeholder="Salary (in ETH)"
                value={inputValue.salary}
              />
              <input 
                type="text"
                className="px-1 py-2 input-double focus-within:ring-indigo-500 z-40"
                onChange={handleInputChange}
                name="role"
                placeholder="Employee role"
                value={inputValue.role}
              />

              <button onClick={addEmployee} className="px-3 py-3 text-gray-100 border rounded-lg p-3 border-gray-600 duration-200 transform bg-gray-800 hover:bg-gray-800/50  z-30">
                  Add Employee!
              </button>
              
            </form>
            {!addHash ? (
                  <div className="flex justify-center items-center py-3">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700" />
                  </div>
                    ) : ( 
                    <h2>Added Employee : {addHash} on {currentDate}, {currentTime}</h2>     
                )}
           
        </div>
      </div>
  )
}

export default AddEmployee