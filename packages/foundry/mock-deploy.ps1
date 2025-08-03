# Mock Deploy Script for Windows
# This script provides a basic mock of contract deployment for development

Write-Host "🚀 Starting Mock Contract Deployment..." -ForegroundColor Green
Write-Host "This is a mock implementation for development purposes" -ForegroundColor Yellow

# Create mock deployment files
$deploymentsDir = "deployments/localhost"
if (!(Test-Path $deploymentsDir)) {
    New-Item -ItemType Directory -Path $deploymentsDir -Force
}

# Mock contract addresses
$mockContracts = @{
    "YourContract" = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
}

# Create mock deployment JSON
$deploymentData = @{
    YourContract = @{
        address = $mockContracts.YourContract
        abi = @()
    }
}

# Save mock deployment data
$deploymentData | ConvertTo-Json -Depth 10 | Out-File "$deploymentsDir/YourContract.json" -Encoding UTF8

Write-Host "✅ Mock contracts deployed!" -ForegroundColor Green
Write-Host "YourContract: $($mockContracts.YourContract)" -ForegroundColor Cyan

# Generate mock TypeScript ABIs
Write-Host "📝 Generating mock TypeScript ABIs..." -ForegroundColor Yellow

$abiDir = "../nextjs/contracts"
if (!(Test-Path $abiDir)) {
    New-Item -ItemType Directory -Path $abiDir -Force
}

# Create mock deployedContracts.ts
$deployedContractsContent = @"
import { getDeployedAddresses } from "./externalContracts";
import { getContract } from "viem";
import { YourContractABI } from "./abis/YourContract";

export const deployedContracts = {
  31337: {
    YourContract: {
      address: "$($mockContracts.YourContract)",
      abi: YourContractABI,
    },
  },
} as const;

export type DeployedContracts = typeof deployedContracts;
"@

$deployedContractsContent | Out-File "$abiDir/deployedContracts.ts" -Encoding UTF8

# Create mock ABI file
$abiContent = @"
export const YourContractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "greetingSetter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newGreeting",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "premium",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "GreetingChange",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "greeting",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "premium",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newGreeting",
        "type": "string"
      }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userGreetingCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;
"@

if (!(Test-Path "$abiDir/abis")) {
    New-Item -ItemType Directory -Path "$abiDir/abis" -Force
}
$abiContent | Out-File "$abiDir/abis/YourContract.ts" -Encoding UTF8

Write-Host "✅ Mock TypeScript ABIs generated!" -ForegroundColor Green
Write-Host "📁 Files created in $abiDir" -ForegroundColor Cyan 