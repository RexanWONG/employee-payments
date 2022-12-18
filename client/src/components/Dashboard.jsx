import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import abi from "../utils/Payments.json";
import truncateEthAddress from 'truncate-eth-address'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'


const Dashboard = () => { 
  const [employeeList, setEmployeeList] = useState([])
  
  const contractAddress = '0xe70BF5e936A5fDa0a93bC6644d53692660f734a0' 
  const contractABI = abi.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const paymentsContract = new ethers.Contract(contractAddress, contractABI, signer);
  const eighteenDecimals = 1000000000000000000
  
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

  useEffect(() => {
    getEmployeeList();
  }, [])




  return (
    <div>
      <div className="p-4">
        <h1 className="text-5xl font-bold antialiased">
          Welcome back 👋
        </h1>
        <h2 className="text-2xl">
          It's great to see you again
        </h2>

        <br></br>
        {<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase ">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Wallet Address
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Salary
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-slate-200/50 border-b text-gray-800">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {employeeList.map(((item) => (
                            <tr key={item.array}>
                              <td>
                                <a href={'https://goerli.etherscan.io/address/' + item.walletAddress} target="_blank" rel="noreferrer">
                                  <Jazzicon diameter={20} seed={jsNumberForAddress(item.walletAddress)} />
                                  <td className="text-gray-800 p-2">{truncateEthAddress(item.walletAddress)}</td> 
                                </a>
                              </td>
                              
                            </tr>
                          )))}
                        </th>
                        <td class="py-4 px-6">
                          {employeeList.map(((item) => (
                              <tr key={item.array}>
                                <td className="p-2">{item.firstName} {item.lastName}</td> 
                              </tr>
                            )))}
                        </td>
                        <td class="py-4 px-6">
                          {employeeList.map(((item) => (
                              <tr key={item.array}>
                                <td className="p-2">{(item.salary/eighteenDecimals).toString()} ETH</td> 
                              </tr>
                            )))}
                          
                        </td>
                        <td class="py-4 px-6">
                          {employeeList.map(((item) => (
                              <tr key={item.array}>
                                <td className="p-2">{item.role}</td> 
                              </tr>
                            )))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>}
      </div>
     

     
    </div>
   
  )
}

export default Dashboard

