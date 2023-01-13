import { Address } from "@graphprotocol/graph-ts";
import { EvalContext, Flow, FlowCommonConfig, StateConfig } from "../generated/schema";
import { Context, Initialize, FlowInitialized, FlowCall} from "../generated/templates/FlowTemplate/Flow";
import { createAccount } from "./utils";

export function handleContext(event: Context): void {
    let evalContext = new EvalContext(event.address.toHex());
    evalContext.caller = createAccount(event.address.toHex(), event.params.context[0][0].toHex()).id;
    evalContext.contract = event.params.context[0][0].toHex();
    evalContext.flowID = event.params.context[1][0];
    if(event.params.context.length > 2){
        evalContext.signer = event.params.context[2][0].toHex();
        evalContext.signedContext = event.params.context[3];
    }
    evalContext.save();
}

export function handleFlowInitialized(event: FlowInitialized): void {
    let flow = Flow.load(event.address.toHex());
    if(flow){
        let dispatches = flow.dispatches;
        if(dispatches) dispatches.push(event.params.dispatch);
        flow.dispatches = dispatches;
        flow.save();
    }
}

export function handleInitialize(event: Initialize): void {
    let flow = new Flow(event.address.toHex());
    flow.factory = event.params.sender.toHex();
    flow.save();

    let stateConfig = new StateConfig(event.address.toHex());
    stateConfig.sources = event.params.config.stateConfig.sources;
    stateConfig.constants = event.params.config.stateConfig.constants;
    stateConfig.flow = flow.id;
    stateConfig.save();

    let flowCommonConfig = new FlowCommonConfig(event.address.toHex());
    flowCommonConfig.expressionDeployer = event.params.config.flowConfig.expressionDeployer;
    flowCommonConfig.interpreter = event.params.config.flowConfig.interpreter;
    flowCommonConfig.flow = flow.id;
    flowCommonConfig.stateConfigs = [];
    let flowLength = event.params.config.flowConfig.flows.length;
    let stateConfigs: string[] = [];
    for(let i=0;i<flowLength;i++){
        let flowConfig = new StateConfig(`${event.address.toHex()}-${i}`);
        flowConfig.sources = event.params.config.flowConfig.flows[i].sources;
        flowConfig.constants = event.params.config.flowConfig.flows[i].constants;
        flowConfig.save();
        stateConfigs.push(flowConfig.id);
    }
    flowCommonConfig.stateConfigs = stateConfigs;
    flowCommonConfig.save();
}