import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account } from "../generated/schema";

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);

export function createAccount(flow: string,address: string) : Account {
    let account = Account.load(`${flow}-${address}`);
    if(!account){
        account = new Account(`${flow}-${address}`);
        account.address = Address.fromHexString(address);
        account.flow = flow;
        account.save();
    }
    return account;
}