import {Operation, Operations, PortfolioPosition} from "@/types/domain";

export default class PositionContainer {
  position!: PortfolioPosition;
  operations: Operation[] | null = null;

  constructor(position: PortfolioPosition) {
    this.position = position;
  }

  get isFill() {
    return !!this.position && !!this.operations
  }

  get loading() {
    return !this.isFill;
  }

  setOperations(operations: Operations) {
    if(operations.operations.length) {
      if(operations.operations[0].figi !== this.position.figi) {
        return false;
      }
    }
    this.operations = operations.operations;
    return true;
  }
}