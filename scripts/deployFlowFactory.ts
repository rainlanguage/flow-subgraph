import hre, { ethers } from "hardhat";
import path from "path";
import { fetchFile, writeFile } from "../test/utils";

const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {

	const blockNumber = await ethers.provider.getBlockNumber();
	const configPath = path.resolve(
		__dirname,
		`../config/${hre.network.name}.json`
	);
	const config = JSON.parse(fetchFile(configPath));

	console.log("Deploying Flow factory");
	const Factory = await ethers.getContractFactory("FlowFactory");
	const factory = await Factory.deploy();
	await factory.deployed();
	console.log("contract deployed : ", factory.address);

    config.network = hre.network.name;
	config.FlowFactory = factory.address;
	config.FlowFactoryBlock = blockNumber;

	writeFile(configPath, JSON.stringify(config, null, 2));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
