import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();
export let rpc_url: string;

describe("subgraph environment test.", () => {
  let signers: SignerWithAddress[];

  before(async () => {
    signers = await ethers.getSigners();
    if (signers.length == 0) throw new Error("No hardhat network found");
  });

  it("test environment should be working", async () => {
    signers.forEach((signer) => {
      console.log(signer.address);
    });

    try {
      const response = fetch("http://localhost:8545", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });
      const rs = await (await response).json();
      rpc_url = "http://localhost";
    } catch {
      const response = fetch(`${process.env.RPC_URL}:${process.env.RPC_PORT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });
      const rs = await (await response).json();
      console.log(rs);
      rpc_url = `${process.env.RPC_URL}`;
    }
    console.log("rpc daemon : ", rpc_url);
  });
});
