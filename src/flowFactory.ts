import { Implementation, NewChild } from "../generated/FlowFactory/FlowFactory";
import { FlowFactory } from "../generated/schema";
import { FlowTemplate } from "../generated/templates";
import { ONE, ZERO } from "./utils";

export function handleImplementation(event: Implementation): void {
    let factory = new FlowFactory(event.address.toHex());
    factory.childrenCount = ZERO;
    factory.implementation = event.params.implementation;
    factory.save();
}

export function handleNewChild(event: NewChild): void {
    let factory = FlowFactory.load(event.address.toHex());
    if(factory){
        factory.childrenCount = factory.childrenCount.plus(ONE);
        factory.save();
    }
    FlowTemplate.create(event.params.child);
}