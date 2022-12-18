import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ethers, utils } from "ethers";
import abi from "../utils/Payments.json";
import truncateEthAddress from 'truncate-eth-address'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'



const Sidebar = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [yourWalletAddress, setYourWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0)

  const contractAddress = '0xe70BF5e936A5fDa0a93bC6644d53692660f734a0' 
  const contractABI = abi.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const paymentsContract = new ethers.Contract(contractAddress, contractABI, signer);

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0];
        setIsWalletConnected(true);
        setYourWalletAddress(account);

        const rawBalance = await provider.getBalance(account)
        console.log("raw balance:", rawBalance)

        const balance = ethers.utils.formatEther(rawBalance)
        setBalance(balance)
        console.log(balance)

        console.log("Account Connected: ", account);
      } else {
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();

  }, [])





  return (
    <aside class="flex items-stretch w-64 min-h-screen" aria-label="Sidebar">

    <div class="overflow-y-auto py-8 px-3 dark:bg-gray-800">
        <a href="https://cryptoblk.io/about-us" class="flex items-center pl-2.5 mb-5" target="_blank" rel="noreferrer">
            <img src="https://cryptoblk.io/wp-content/uploads/2022/05/CryptoBLK_header.svg" class="mr-3 h-6 sm:h-7" alt="Cryptoblk Logo Logo" />
        </a>

        <ul class="space-y-2">
            <li>
                <Link to="/">
                    <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                    </a>
                </Link>   
            </li>
            <li>
                <Link to="/add-employee">
                    <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">Add employee</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link to="/deposit">
                    <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">Deposit</span>
                    </a>
                </Link>
                
            </li>
        </ul>
        <div id="dropdown-cta" class="p-4 px-1 absolute bottom-0" role="alert">
            <div class="flex items-center">
                {!isWalletConnected? (
                    <></>
                ) : (
                    <span class="bg-green-300 text-black text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">Connected to Goerli</span>
                )}
                
            </div>
                {!isWalletConnected ? (
                        <button onClick={checkIfWalletIsConnected} className="bg-gray-100 text-gray hover:bg-gray-200 py-2 px-7 justify-center rounded shadow cursor-pointer">
                            Connect Wallet
                        </button>
                    ) : ( 
                        <a class="flex items-center" href={'https://goerli.etherscan.io/address/' + yourWalletAddress} target="_blank" rel="noreferrer">
                            <Jazzicon diameter={40} seed={jsNumberForAddress(yourWalletAddress)} />
                            <div class="py-5">
                                <h1 className="text-gray-100 font-semibold px-3">{truncateEthAddress(yourWalletAddress)}</h1>
                                <h1 className="text-gray-100 px-3">{Math.round(balance * 1000)/1000} ETH</h1>
                            </div>
                        </a>
                         
                )}
        </div>
    </div>
    </aside>
  )
}

export default Sidebar