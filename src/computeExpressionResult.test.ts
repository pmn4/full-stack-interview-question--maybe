import { Operand } from 'expressions';
import { SupportedOperator, computeExpressionResult } from './computeExpressionResult';

describe('computeExpressionResult', () => {
  const scenarios: {
    given: (SupportedOperator | Operand)[];
    expected: number;
    explanation: string;
  }[] = [
    {
      given: [1, 2, '+'],
      expected: 3,
      explanation: '1 + 2',
    },
    {
      given: [2, 3, '-'],
      expected: -1,
      explanation: '2 - 3',
    },
    {
      given: [3, 4, '*'],
      expected: 12,
      explanation: '3 * 4',
    },
    {
      given: [4, 5, '/'],
      expected: 0.8,
      explanation: '4 / 5',
    },
    {
      given: [5, 6, '+', 7, '*'],
      expected: 77,
      explanation: '(5 + 6) * 7',
    },
    {
      given: [5, 6, '+', 7, 8, '*', '-'],
      expected: -45,
      explanation: '(5 + 6) - (7 * 8)',
    },
  ];

  scenarios.forEach(({ given, expected, explanation }) => {
    it(`does the math: "${given.join(',')}" -> ${expected}`, () => {
      const result = computeExpressionResult(given);

      expect(result.valueOf()).toEqual(expected);
    });

    it(`explains the math: "${given.join(',')}" -> '${explanation}'`, () => {
      const result = computeExpressionResult(given);

      expect(result.valueOf()).toEqual(expected);
    });
  });

  it('errors on too many operations', () => {
    expect(() => computeExpressionResult([1, 2, 3, '+'])).toThrow();
  });
});
