## WAGMI GAMES 3D NFT App

This application allows you to connect your wallet and view your 3D printable NFTs in an interactive and user-friendly way and even 3D print them in collaboration with 3DHoudini.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Connecting Your Wallet and signing API requests with your wallet signature](#connecting-your-wallet-and-signing-API-requests-with-your-wallet-signature)
  - [View your 3D Printable](#view-your-3d-printable)
  - [Print your 3D Printable](#print-your-3d-printable)
  - [Edit shipping details of your 3D Printable](#edit-shipping-details-of-your-3d-printable)
- [Code structure](#Code-Structure)
  - [Components](#components)
  - [Constants](#Constants)
  - [Hooks](#Hooks)
  - [Packages](#Packages)
  - [Pages](#Pages)
  - [Services](#Services)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version X.X.X)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Installation

#### Define .env
- NEXT_PUBLIC_PROJECT_ID: Visit the [WalletConnect Documentation](https://docs.walletconnect.com/2.0/web3modal/react/wagmi/installation) and refer to the "Get started" portion to generate your project ID.
- NEXT_PUBLIC_MORALIS_API_KEY: Visit the [Moralis Documentation](https://docs.moralis.io/web3-data-api/evm/get-your-api-key) and refer to the "Get API Key" portion to login to your moralis dashboard and generate the API key.

#### Running the application
First, run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

## Usage

### Connecting Your Wallet and signing API requests with your wallet signature
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the Homepage where you can connect your wallet.
- Click the "Connect Wallet" button to initiate the wallet connection process.
- Follow the on-screen instructions to connect your wallet (e.g., MetaMask, Trust Wallet) to the application.
- After connecting your wallet, you will be asked to sign the request certificate that would be used to verify the authenticity of the call made to the backend APIs.

### View your 3D Printable
- After successfully signing the request, you will be able to see a list of your 3D printable NFTs.
- Click on a Printable to initiate the 3D printing process and proceed to the checkout page.

### Print your 3D Printable
- Proceed to fill and submit the shipping details to save the details so as to be utilised in the future.
-After successfully verifying the shipping address, confirm the payment amount and proceed with your preferred mode of payment in either crypto or fiat.
- You shall be redirected to your unique payment portal link that is only valid for a certain amount of time (1 hour for crypto checkout and 24 hours for fiat checkout). On successful payment you shall be redirected back to the app where upon you can see the shipping status of your 3D printable by going to the dashboard and clicking on the 3D printable NFT that you had completed the payment for.
- If incase you by chance exit out of the payment link without paying at that time, you always have the option to visit the link by going to the dashboard and clicking on the 3D printable NFT that you had initiated the payment for. This would show you the status of the payment and shipping procedure that you had initiated

### Edit shipping details of your 3D Printable
- You can edit the shipping details if changes are needed, as long as you haven't started the payment procedure outlined in the steps above.
- If you still want to edit the shipping details despite having initiated the payment procedure, but have not successfully completed the payment details, wait for your unique payment link to expire before editting the shipping details and regenerating a new link by following the above payment steps outlined

### View all order details(Only only)
- Open [http://localhost:3000/admin](http://localhost:3000/admin) with your browser to see the admin page where upon signing the certificate, you would be able to see the details and status of all the orders created. This detail can be seen in the dashboard table that allows you to filter the table data based on certain criterion that can be applied to the payment details and status tabs
- Click on the update button of a particular token id f you would like to update the shipping status of that token id. You can update the shipping status variable of the NFT smart contract and the shipping status in the database by respectively clicking on "Update SC" and "Update DB" buttons. The database can only be updated if the payment has been completed


## Code Structure

### components
- admin: Contains all the components, like dashboardtable and the update status modal that is utilised in the admin page
- checkout: Contains all the componenets, like shipping card and payment card that is utilised in the checkout page
- common: Contains all the common components like header, sign message, loader and switch network that is utilised across all the pages
- dashboard: Contains all the components like token card that is utilised in the dashboard page
- toast: Contains all the toast components that would display the the success, error or some information to the user

### Constants
- app.config.json contains the defined mappings and details such as NFT contract address, chain Id, backend server API url, certificate message and such.
- interfaceText contains the defined mapping of the the texts to be displayed on the UI
- serverCodes contains the defined mapping of the different payment and shipping codes returned by the backend API

### Hooks
- NetworkConnectionContext: Provides React hooks to verify and prompt the user to switch to the correct wallet network.
- UserAuthContext: provides React hooks to verify and prompt the user to sign the certificate message that is to be verified by the backend API
- userDataContext: Provides React hooks to store the selected token ID and connected user wallet address

### Packages
- Wagmi: Provides React Hooks and methods to access and interact with the Ethereum Blockchain.
- web3Modal: used to display a modal that lets the user connect their wallet to the DApp.
- Axios: Used to make HTTP requests. 
- Moralisis: Used to fetch the NFT metadata
- Stripe: Used to provide card checkout for the users

### Pages
- In "index.js", the default route "/" renders a webpage with a "Connect Wallet" button that triggers the web3 connect modal using handleConnectWallet().
- In "dashboard.js", the default route "/dashboard" displays all 3D printable NFTs owned by the connected account.
- In "checkout.js," the default route "/checkout" renders the checkout page for a specific 3D printable, allowing users to enter and edit shipping details and initiate payment.
- In "status.js", the default route "/status" renders the status page for a specific 3D printable, enabling users to check its payment and shipping progress.
- In "admin.js", the default route "/admin" renders the admin page, enabling admins to check and update the statuses of all the 3D printables order.

### Services
- orders: Fetches and posts various order related data to the backend API using Axios.
- payments: Posts and returns the generated unique checkout payment link for a particular token ID
- tokens: Fetching the user's 3D printable tokens, contract baseURI and contract print status from the blockchain using Wagmi and moralis API.
