// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class FlowFactory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FlowFactory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FlowFactory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FlowFactory", id.toString(), this);
    }
  }

  static load(id: string): FlowFactory | null {
    return changetype<FlowFactory | null>(store.get("FlowFactory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get children(): Array<string> | null {
    let value = this.get("children");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set children(value: Array<string> | null) {
    if (!value) {
      this.unset("children");
    } else {
      this.set("children", Value.fromStringArray(<Array<string>>value));
    }
  }

  get childrenCount(): BigInt {
    let value = this.get("childrenCount");
    return value!.toBigInt();
  }

  set childrenCount(value: BigInt) {
    this.set("childrenCount", Value.fromBigInt(value));
  }

  get implementation(): Bytes {
    let value = this.get("implementation");
    return value!.toBytes();
  }

  set implementation(value: Bytes) {
    this.set("implementation", Value.fromBytes(value));
  }
}

export class Flow extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Flow entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Flow must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Flow", id.toString(), this);
    }
  }

  static load(id: string): Flow | null {
    return changetype<Flow | null>(store.get("Flow", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get factory(): string {
    let value = this.get("factory");
    return value!.toString();
  }

  set factory(value: string) {
    this.set("factory", Value.fromString(value));
  }

  get dispatches(): Array<BigInt> | null {
    let value = this.get("dispatches");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set dispatches(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("dispatches");
    } else {
      this.set("dispatches", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get evalEvents(): Array<string> | null {
    let value = this.get("evalEvents");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set evalEvents(value: Array<string> | null) {
    if (!value) {
      this.unset("evalEvents");
    } else {
      this.set("evalEvents", Value.fromStringArray(<Array<string>>value));
    }
  }

  get accounts(): Array<string> | null {
    let value = this.get("accounts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set accounts(value: Array<string> | null) {
    if (!value) {
      this.unset("accounts");
    } else {
      this.set("accounts", Value.fromStringArray(<Array<string>>value));
    }
  }

  get stateConfig(): string {
    let value = this.get("stateConfig");
    return value!.toString();
  }

  set stateConfig(value: string) {
    this.set("stateConfig", Value.fromString(value));
  }

  get flowCommonConfig(): string {
    let value = this.get("flowCommonConfig");
    return value!.toString();
  }

  set flowCommonConfig(value: string) {
    this.set("flowCommonConfig", Value.fromString(value));
  }
}

export class EvalContext extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EvalContext entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type EvalContext must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("EvalContext", id.toString(), this);
    }
  }

  static load(id: string): EvalContext | null {
    return changetype<EvalContext | null>(store.get("EvalContext", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get caller(): string {
    let value = this.get("caller");
    return value!.toString();
  }

  set caller(value: string) {
    this.set("caller", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get flowID(): BigInt {
    let value = this.get("flowID");
    return value!.toBigInt();
  }

  set flowID(value: BigInt) {
    this.set("flowID", Value.fromBigInt(value));
  }

  get signer(): string | null {
    let value = this.get("signer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set signer(value: string | null) {
    if (!value) {
      this.unset("signer");
    } else {
      this.set("signer", Value.fromString(<string>value));
    }
  }

  get signedContext(): Array<BigInt> | null {
    let value = this.get("signedContext");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set signedContext(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("signedContext");
    } else {
      this.set("signedContext", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }
}

export class EvalEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EvalEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type EvalEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("EvalEvent", id.toString(), this);
    }
  }

  static load(id: string): EvalEvent | null {
    return changetype<EvalEvent | null>(store.get("EvalEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get evalContext(): string {
    let value = this.get("evalContext");
    return value!.toString();
  }

  set evalContext(value: string) {
    this.set("evalContext", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get emitter(): string {
    let value = this.get("emitter");
    return value!.toString();
  }

  set emitter(value: string) {
    this.set("emitter", Value.fromString(value));
  }

  get flow(): string {
    let value = this.get("flow");
    return value!.toString();
  }

  set flow(value: string) {
    this.set("flow", Value.fromString(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Transaction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get events(): Array<string> | null {
    let value = this.get("events");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set events(value: Array<string> | null) {
    if (!value) {
      this.unset("events");
    } else {
      this.set("events", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get events(): Array<string> | null {
    let value = this.get("events");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set events(value: Array<string> | null) {
    if (!value) {
      this.unset("events");
    } else {
      this.set("events", Value.fromStringArray(<Array<string>>value));
    }
  }

  get flow(): string {
    let value = this.get("flow");
    return value!.toString();
  }

  set flow(value: string) {
    this.set("flow", Value.fromString(value));
  }
}

export class StateConfig extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save StateConfig entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type StateConfig must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("StateConfig", id.toString(), this);
    }
  }

  static load(id: string): StateConfig | null {
    return changetype<StateConfig | null>(store.get("StateConfig", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sources(): Array<Bytes> {
    let value = this.get("sources");
    return value!.toBytesArray();
  }

  set sources(value: Array<Bytes>) {
    this.set("sources", Value.fromBytesArray(value));
  }

  get constants(): Array<BigInt> {
    let value = this.get("constants");
    return value!.toBigIntArray();
  }

  set constants(value: Array<BigInt>) {
    this.set("constants", Value.fromBigIntArray(value));
  }

  get flow(): string | null {
    let value = this.get("flow");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set flow(value: string | null) {
    if (!value) {
      this.unset("flow");
    } else {
      this.set("flow", Value.fromString(<string>value));
    }
  }
}

export class FlowCommonConfig extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FlowCommonConfig entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FlowCommonConfig must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FlowCommonConfig", id.toString(), this);
    }
  }

  static load(id: string): FlowCommonConfig | null {
    return changetype<FlowCommonConfig | null>(
      store.get("FlowCommonConfig", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get expressionDeployer(): Bytes {
    let value = this.get("expressionDeployer");
    return value!.toBytes();
  }

  set expressionDeployer(value: Bytes) {
    this.set("expressionDeployer", Value.fromBytes(value));
  }

  get interpreter(): Bytes {
    let value = this.get("interpreter");
    return value!.toBytes();
  }

  set interpreter(value: Bytes) {
    this.set("interpreter", Value.fromBytes(value));
  }

  get stateConfigs(): Array<string> {
    let value = this.get("stateConfigs");
    return value!.toStringArray();
  }

  set stateConfigs(value: Array<string>) {
    this.set("stateConfigs", Value.fromStringArray(value));
  }

  get flow(): string {
    let value = this.get("flow");
    return value!.toString();
  }

  set flow(value: string) {
    this.set("flow", Value.fromString(value));
  }
}
