import { SupportedOperator, computeExpressionResult } from 'computeExpressionResult';
import { Operand } from 'expressions';

// Glossed over a bit here is how we convert a user's input, which is likely
// displayed in a more traditional infix notation (e.g., a+b) into a postfix
// expression (e.g., a b +).

const inputs: (SupportedOperator | Operand)[] = [
  1,
  2,
  '+', // 1 + 2
  7,
  10,
  '-', // 7 - 10
  '*', // (1 + 2) * (7 - 10)
  '^-1',
  '^-1',
];
const rootExpression = computeExpressionResult(inputs);

console.log(rootExpression.explain());

console.log(`result: ${rootExpression.toFixed(2)}`);
