export type Operand = number | IPostfixExpression;
export interface IPostfixExpression {
  operands: Operand[];
  toFixed(...args: Parameters<typeof Number.prototype.toFixed>): string;
  valueOf(): number;
  explain(): string;
}

function isOperand<T>(value: Operand, _index?: number, _array?: Operand[]): value is Operand {
  // a little hacky, but let's use `toFixed` as our marker that this value can
  // have arithmetic operations performed on it
  return Boolean(value.toFixed);
}

abstract class PostfixExpression implements IPostfixExpression {
  static operandCount = 0;

  // this is more to show that all constructors should take an array of operands
  constructor(readonly operands: Operand[]) {}

  toFixed(...args: Parameters<typeof Number.prototype.toFixed>): string {
    return Number.prototype.toFixed.call(this.valueOf(), ...args);
  }

  abstract valueOf(): number;
  abstract explain(): string;

  protected operandAsExpression(operand: Operand): string {
    return operand instanceof PostfixExpression ? `(${operand.explain()})` : operand.toString();
  }
}

abstract class UnaryExpression extends PostfixExpression {
  readonly operand: Operand;

  static operandCount = 1;

  constructor(operands: Operand[]) {
    super(operands);

    this.assertOneNumericOperand(operands);

    [this.operand] = operands;
  }

  assertOneNumericOperand(operands: Operand[]): operands is [number] {
    if (operands.length !== UnaryExpression.operandCount) {
      throw new Error(`UnaryExpression requires exactly one operand. got ${operands.length}`);
    }

    if (!operands.every(isOperand)) {
      throw new Error(`BinaryExpression requires a numeric operand: ${operands}`);
    }

    return true;
  }
}

abstract class BinaryExpression extends PostfixExpression {
  readonly left: Operand;
  readonly right: Operand;

  static operandCount = 2;

  constructor(operands: Operand[]) {
    super(operands);

    this.assertTwoNumericOperands(operands);

    [this.left, this.right] = operands;
  }

  assertTwoNumericOperands(operands: Operand[]): operands is [number, number] {
    if (operands.length !== BinaryExpression.operandCount) {
      throw new Error(`BinaryExpression requires exactly two operands. got ${operands.length}`);
    }

    if (!operands.every(isOperand)) {
      throw new Error(`BinaryExpression requires numeric operands: ${operands}`);
    }

    return true;
  }
}

export class AdditionExpression extends BinaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return this.left.valueOf() + this.right.valueOf();
  }

  explain(): string {
    return `${this.operandAsExpression(this.left)} + ${this.operandAsExpression(this.right)}`;
  }
}

export class SubtractionExpression extends BinaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return this.left.valueOf() - this.right.valueOf();
  }

  explain(): string {
    return `${this.operandAsExpression(this.left)} - ${this.operandAsExpression(this.right)}`;
  }
}

export class MultiplicationExpression extends BinaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return this.left.valueOf() * this.right.valueOf();
  }

  explain(): string {
    return `${this.operandAsExpression(this.left)} * ${this.operandAsExpression(this.right)}`;
  }
}

export class DivisionExpression extends BinaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return this.left.valueOf() / this.right.valueOf();
  }

  explain(): string {
    return `${this.operandAsExpression(this.left)} / ${this.operandAsExpression(this.right)}`;
  }
}

export class InverseExpression extends UnaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return 1 / this.operand.valueOf();
  }

  explain(): string {
    return `${this.operandAsExpression(this.operand)}^-1`;
  }
}

// use your imagination!
// export class ExponentExpression extends BinaryExpression
// export class IncrementExpression extends UnaryExpression
// export class DecrementExpression extends UnaryExpression
// etc...

export class NoopExpression extends UnaryExpression {
  valueOf(): number {
    // memoization opportunity

    // despite JavaScript calling valueOf() on the operands, we still need to
    // call it on the operands ourselves, because TypeScript doesn't know that
    return this.operand.valueOf();
  }

  explain(): string {
    return this.valueOf().toString();
  }
}
