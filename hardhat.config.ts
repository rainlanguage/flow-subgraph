import type { HardhatUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
import "hardhat-contract-sizer";

const MOCHA_TESTS_PATH = process.env.TESTS_PATH || "./test";
const MOCHA_SHOULD_BAIL = process.env.BAIL === "true";

function createDockerConfig() {
  const url = "http://192.168.0.215:8545";
  const mnemonic =
    "test test test test test test test test test test test junk";
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    url,
  };
}

function createLocalhostConfig() {
  const url = "http://localhost:8545";
  const mnemonic =
    "test test test test test test test test test test test junk";
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    url,
  };
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: "typechain", // overrides upstream 'fix' for another issue which changed this to 'typechain-types'
  },
  networks: {
    hardhat: {
      blockGasLimit: 100000000,
      allowUnlimitedContractSize: true,
    },
    docker: createDockerConfig(),
    localhost: createLocalhostConfig()
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000000,
            details: {
              peephole: true,
              inliner: true,
              jumpdestRemover: true,
              orderLiterals: true,
              deduplicate: true,
              cse: true,
              constantOptimizer: true,
            },
          },
          evmVersion: "london",
          // viaIR: true,
          metadata: {
            useLiteralContent: true,
          },
        },
      },
    ],
  },
  mocha: {
    // explicit test configuration, just in case
    asyncOnly: true,
    bail: MOCHA_SHOULD_BAIL,
    parallel: false,
    timeout: 0,
  },
  paths: {
    tests: MOCHA_TESTS_PATH,
  },
};
export default config;