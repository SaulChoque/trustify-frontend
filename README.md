# Trustify Frontend

This is a Scaffold-ETH 2 (SE-2) project built with NextJS, RainbowKit, Wagmi and TypeScript. It supports Hardhat and Foundry for smart contract development.

## Quick Start

### Prerequisites

- Node.js >= 20.18.3
- Yarn 3.2.3
- Windows PowerShell (for Windows users)

### Installation

1. Install dependencies:
```bash
yarn install
```

### Running the Project

#### Option 1: With Mock Blockchain (Recommended for Windows without Foundry)

1. Start the mock blockchain:
```bash
yarn chain
```

2. Deploy mock contracts:
```bash
yarn deploy
```

3. Start the frontend:
```bash
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

#### Option 2: With Real Foundry (Requires Foundry installation)

1. Install Foundry (see [Foundry Installation Guide](https://book.getfoundry.sh/getting-started/installation))
2. Start the local blockchain:
```bash
yarn chain
```

3. Deploy contracts:
```bash
yarn deploy
```

4. Start the frontend:
```bash
yarn start
```

### Project Structure

- `packages/foundry/` - Smart contracts and deployment scripts
- `packages/nextjs/` - Frontend application
- `packages/foundry/contracts/` - Solidity smart contracts
- `packages/foundry/script/` - Deployment scripts
- `packages/nextjs/app/` - Next.js application pages
- `packages/nextjs/components/` - React components

### Available Scripts

- `yarn chain` - Start local blockchain (mock or real)
- `yarn deploy` - Deploy contracts
- `yarn start` - Start frontend development server
- `yarn start-project` - One-click project starter (Windows)
- `yarn build` - Build frontend for production
- `yarn test` - Run smart contract tests

### Smart Contract Development

The project includes a sample contract `YourContract.sol` with the following features:
- Greeting management
- Premium features
- User counters
- Withdrawal functionality

### Frontend Features

- Wallet connection with RainbowKit
- Contract interaction UI
- Debug interface at `/debug`
- Block explorer at `/blockexplorer`
- **Admin Panel** at `/admin` - Management interface for certifications, users, and authorizers

### Troubleshooting

#### Windows Users
If you encounter issues with Foundry installation on Windows:
1. Use the mock blockchain option (Option 1 above)
2. Install Visual Studio Build Tools if you want to use real Foundry
3. Consider using WSL2 for a Linux environment

#### Common Issues
- If the frontend shows connection errors, make sure the blockchain is running
- If contracts don't deploy, check that the blockchain is accessible
- For wallet connection issues, ensure you have a Web3 wallet installed

### Development

To add new contracts:
1. Create your contract in `packages/foundry/contracts/`
2. Create deployment script in `packages/foundry/script/`
3. Update the main deployment script `packages/foundry/script/Deploy.s.sol`
4. Deploy with `yarn deploy`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.