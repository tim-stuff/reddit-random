# Stable Assignment - Ethereum Block Explorer Frontend

Stable Assignment is a frontend implementation of an Ethereum block explorer, providing users with essential information about addresses, transactions, and ERC-20 tokens. It includes key features such as ether and gas prices, a search bar, and a wallet connection option.

## Features

### Header

- Displays ether price and gas price in gwei.

### Search Bar

- Search for a particular address, transaction hash, or token.

### Address Details

- View the ether balance of a specific address.
- List normal transactions with pagination.
- Display a list of ERC-20 token transfers with pagination.

### Token Details

- Show total supply of a token.
- Display the balance of a particular account for the token.

### Wallet Connection

- Connect your wallet (not restricted to MetaMask).
- Access a profile dashboard with ether balance, list of normal transactions, and ERC-20 token details.

## Technologies Used

- ReactJS
- Next.js
- Tailwindcss
- Web3Modal
- Wagmi
- Axios
- Etherscan API

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/kror-shack/stable-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd stable-assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env.local file in the root of the project with the following variables and add your keys:

   ```bash
   ETHERSCAN_API:
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit http://localhost:3000 to view the application.
