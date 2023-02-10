import hre, { ethers } from "hardhat";
import { FlowFactory } from "../typechain";
import * as path from "path";
import { exec, fetchFile, fetchSubgraph, waitForSubgraphToBeSynced, writeFile } from "./utils";
import { rpc_url } from "./0_env_test.test";
import { ApolloFetch, FetchResult } from "apollo-fetch";
import { assert } from "chai";

export let factory: FlowFactory;
export let subgraph: ApolloFetch
describe("Deploy flowFactory", () => {
  before(async () => {
    const Factory = await ethers.getContractFactory("FlowFactory");
    factory = await Factory.deploy();
    await factory.deployed();

    const configPath = path.resolve(
      __dirname,
      `../config/localhost.json`
    );
    const config = JSON.parse(fetchFile(configPath));

    config.network = 'localhost';
    config.FlowFactory = factory.address;
    config.FlowFactoryBlock =
      factory.deployTransaction.blockNumber;

    writeFile(configPath, JSON.stringify(config, null, 2));

    exec(`graph create --node ${rpc_url}:8020/ rainprotocol/flow`)
    exec(`npx mustache config/localhost.json subgraph.template.yaml subgraph.yaml && graph deploy --node ${rpc_url}:8020/ --ipfs ${rpc_url}:5001 rainprotocol/flow  --version-label 1`)

    subgraph = fetchSubgraph("rainprotocol/flow");
  });

  it("should create FlowFactory entity",async () => {
    await waitForSubgraphToBeSynced(1000, 1, 60, "rainprotocol/flow");
    const query = `{
        flowFactory(id: "${factory.address.toLowerCase()}"){
            id
            childrenCount
        }
    }`;

    const response = (await subgraph({query})) as FetchResult;
    const factoryData = response.data.flowFactory;
    assert.equal(factoryData.id, factory.address.toLowerCase());
    assert.equal(factoryData.childrenCount, 0);
  });
});
