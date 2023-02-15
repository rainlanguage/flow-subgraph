import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { FetchResult } from "apollo-fetch";
import { assert, expect } from "chai";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { InitializeEvent } from "../typechain/contracts/flow/basic/Flow";
import { getEventArgs, memoryOperand, MemoryType, op, Opcode } from "../utils";
import { flowDeploy } from "../utils/deploy/flow/basic/deploy";
import { FlowConfig } from "../utils/types/flow";
import { factory, subgraph } from "./2_flowFactory.test";
import { waitForSubgraphToBeSynced } from "./utils";

describe("deploy Flow test", () => {
  let deployer: SignerWithAddress;
  let signers: SignerWithAddress[];

  before(async () => {
    signers = await ethers.getSigners();
    deployer = signers[0];
  });
  it("Should create Flow entity", async () => {
    const constants = [1, 2];

    // prettier-ignore
    // example source, only checking stack length in this test
    const sourceFlowIO = concat([
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // ERC1155 SKIP
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // ERC721 SKIP
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // ERC20 SKIP
    
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // NATIVE END
    
          op(Opcode.CONTEXT, 0x0001), // from
          op(Opcode.CONTEXT, 0x0000), // to
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // native me->you amount
    
          op(Opcode.CONTEXT, 0x0000), // from
          op(Opcode.CONTEXT, 0x0001), // to
          op(Opcode.READ_MEMORY, memoryOperand(MemoryType.Constant, 1)), // native you->me amount
        ]);

    const sources: never[] = [];

    const flowConfig: FlowConfig = {
      stateConfig: { sources, constants },
      flows: [
        {
          sources: [sourceFlowIO],
          constants,
        },
      ],
    };

    const { flow } = await flowDeploy(deployer, factory, flowConfig);
    const { sender, config } = (await getEventArgs(
      flow.deployTransaction,
      "Initialize",
      flow
    )) as InitializeEvent["args"];

    await waitForSubgraphToBeSynced(1000, 1, 60, "rainprotocol/flow");

    const queryFactory = `{
        flowFactory(id: "${factory.address.toLowerCase()}"){
            childrenCount
            children{
                id
            }
        }
    }`;

    const responseFactory = (await subgraph({ query: queryFactory })) as FetchResult;
    const factoryData = responseFactory.data.flowFactory;

    assert.equal(factoryData.childrenCount, 1);
    expect(factoryData.children).deep.includes({
      id: flow.address.toLowerCase(),
    });

    const queryFlow = `{
      flow(id: "${flow.address.toLowerCase()}"){
        stateConfig{
          sources
          constants
        }
        flowCommonConfig{
          stateConfigs{
            sources
            constants
          }
        }
      }
    }`;

    const responseFlow = (await subgraph({query: queryFlow})) as FetchResult;
    const flowData = responseFlow.data.flow;

  });
});
