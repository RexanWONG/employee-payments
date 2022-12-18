# employee-payments

This dapp is a simulation of what it would be like if a company used this dapp to manage their salary payments to their employees.
It was also a dapp created for me to learn about the different tools and technologies used in blockchain development

Add, view, and deposit funds to employees in a certain company.  

# Fork the project to try it out yourself.  
1. Git clone the project
2. In contracts/hardhat.config.js, change the <code>URL</code> and <code>PRIVATE_KEY</code> to your own api key and private key respectively.
3. Deploy the contract - <code>npx hardhat run scripts/deploy.js --network goerli</code>
4. In client/src/utils/payments.json, change my ABI to your own contract ABI.  You can find your own contract ABI inside contracts/contracts/Payments.json.
5. Inside all of the files in the components folder except for index.js and Footer.jsx, change my contract address of Payments.sol to your's.
6. Start tinkering




<img width="1430" alt="Screenshot 2022-12-18 at 5 43 32 PM" src="https://user-images.githubusercontent.com/96183717/208291477-5551d194-4ae2-4500-89b3-3bb98e20def3.png">
