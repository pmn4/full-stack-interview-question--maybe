import {
  AdditionExpression,
  DivisionExpression,
  IPostfixExpression,
  InverseExpression,
  MultiplicationExpression,
  NoopExpression,
  Operand,
  SubtractionExpression,
} from './expressions';

const OperatorMap = {
  '+': AdditionExpression,
  '-': SubtractionExpression,
  '*': MultiplicationExpression,
  '/': DivisionExpression,
  '^-1': InverseExpression,
};
export type SupportedOperator = keyof typeof OperatorMap;

export function computeExpressionResult(
  postfixStatements: (SupportedOperator | Operand)[],
): IPostfixExpression {
  const rootExpressionStack = postfixStatements.reduce((stack, input) => {
    if (typeof input === 'number') {
      stack.push(new NoopExpression([input]));
    } else {
      const Expression = OperatorMap[input as SupportedOperator];
      const operands = stack.splice(
        stack.length - Expression.operandCount,
        Expression.operandCount,
      );

      stack.push(new Expression(operands));
    }

    return stack;
  }, [] as IPostfixExpression[]);

  if (rootExpressionStack.length !== 1) {
    throw new Error('too many expressions');
  }

  // the stack should be reduced to a single operation. if not, there are superfluous inputs
  return rootExpressionStack[0];
}
