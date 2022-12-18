//SPDX-License-Identifier: MIT License

pragma solidity ^0.8.14;

contract Payments {
    address owner;

    /// @notice Emitted when funds are received by an employee
    event LogEmployeeSalaryReceived(address addr, uint256 amount, uint256 contractBalance);

    constructor() { 
        owner = msg.sender;
    }

    /// @notice A struct representing an employee
    struct Employee {
        address payable walletAddress;
        string firstName;   
        string lastName;
        uint256 salary;
        string role;
    }

    /// @notice An array of employees
    Employee[] public employees;
  
    /// @notice Adds a new employee to the contract
    /// @param walletAddress The wallet address of the employee
    /// @param firstName The first name of the employee
    /// @param lastName The last name of the employee
    /// @param salary The salary of the employee
    /// @param role The role of the employee 
    function addEmployee(
        address payable walletAddress, 
        string memory firstName, 
        string memory lastName, 
        uint256 salary, 
        string memory role
    ) public onlyOwner {
        employees.push(Employee(walletAddress, firstName, lastName, salary, role));
    } 


    function checkBalance() public view returns(uint256) {
        return address(this).balance;
    } 

    function deposit(address walletAddress) payable public onlyOwner {  
        addToEmployeeBalance(walletAddress); 
    } 

    function getEmployeeList() public view returns (Employee[] memory) {
        return employees;
    }
    
    function addToEmployeeBalance(address walletAddress) private {    
        for (uint i = 0 ; i < employees.length ; i++){
            if (employees[i].walletAddress == walletAddress){
                employees[i].salary += msg.value;
                emit LogEmployeeSalaryReceived(walletAddress, msg.value, checkBalance());
            }
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
}    
    
