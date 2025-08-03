import { getDeployedAddresses } from "./externalContracts";
import { getContract } from "viem";
import { YourContractABI } from "./abis/YourContract";

export const deployedContracts = {
  31337: {
    YourContract: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: YourContractABI,
    },
  },
} as const;

export type DeployedContracts = typeof deployedContracts;
