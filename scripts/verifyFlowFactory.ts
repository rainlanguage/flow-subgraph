import hre from "hardhat";
import path from "path";
import { fetchFile } from "../test/utils";

async function main() {

	const configPath = path.resolve(
		__dirname,
		`../config/${hre.network.name}.json`
	);
	const config = JSON.parse(fetchFile(configPath));

	console.log("Verifying Contract");
	await hre.run("verify:verify", {
		address: config.FlowFactory,
		contract: "contracts/flow/basic/FlowFactory.sol:FlowFactory",
		constructorArguments: [],
	});
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
