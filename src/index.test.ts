import {
  AdditionExpression,
  SubtractionExpression,
  MultiplicationExpression,
  DivisionExpression,
  InverseExpression,
} from './expressions';

describe('PostfixExpressions', () => {
  describe('AdditionExpression', () => {
    it('does the math', () => {
      expect(new AdditionExpression([4, 2]).valueOf()).toEqual(6);
    });

    it('explains itself', () => {
      expect(new AdditionExpression([4, 2]).explain()).toEqual('4 + 2');
    });

    it('allows for Expressions as operands', () => {
      expect(new AdditionExpression([new AdditionExpression([4, 2]), 2]).valueOf()).toEqual(8);
    });

    it('errors on too few operands', () => {
      expect(() => new AdditionExpression([2]).valueOf()).toThrow();
    });

    it('errors on too many operands', () => {
      expect(() => new AdditionExpression([4, 2, 2]).valueOf()).toThrow();
    });
  });

  describe('SubtractionExpression', () => {
    it('does the math', () => {
      expect(new SubtractionExpression([4, 2]).valueOf()).toEqual(2);
    });

    it('explains itself', () => {
      expect(new SubtractionExpression([4, 2]).explain()).toEqual('4 - 2');
    });

    it('allows for Expressions as operands', () => {
      expect(new SubtractionExpression([new SubtractionExpression([4, 2]), 2]).valueOf()).toEqual(
        0,
      );
    });

    it('errors on too few operands', () => {
      expect(() => new SubtractionExpression([2]).valueOf()).toThrow();
    });

    it('errors on too many operands', () => {
      expect(() => new SubtractionExpression([4, 2, 2]).valueOf()).toThrow();
    });
  });

  describe('MultiplicationExpression', () => {
    it('does the math', () => {
      expect(new MultiplicationExpression([4, 2]).valueOf()).toEqual(8);
    });

    it('explains itself', () => {
      expect(new MultiplicationExpression([4, 2]).explain()).toEqual('4 * 2');
    });

    it('allows for Expressions as operands', () => {
      expect(
        new MultiplicationExpression([new MultiplicationExpression([4, 2]), 2]).valueOf(),
      ).toEqual(16);
    });

    it('errors on too few operands', () => {
      expect(() => new MultiplicationExpression([2]).valueOf()).toThrow();
    });

    it('errors on too many operands', () => {
      expect(() => new MultiplicationExpression([4, 2, 2]).valueOf()).toThrow();
    });
  });

  describe('DivisionExpression', () => {
    it('does the math', () => {
      expect(new DivisionExpression([4, 2]).valueOf()).toEqual(2);
    });

    it('explains itself', () => {
      expect(new DivisionExpression([4, 2]).explain()).toEqual('4 / 2');
    });

    it('allows for Expressions as operands', () => {
      expect(new DivisionExpression([new DivisionExpression([4, 2]), 2]).valueOf()).toEqual(1);
    });

    it('errors on too few operands', () => {
      expect(() => new DivisionExpression([2]).valueOf()).toThrow();
    });

    it('errors on too many operands', () => {
      expect(() => new DivisionExpression([4, 2, 2]).valueOf()).toThrow();
    });
  });

  describe('InverseExpression', () => {
    it('does the math', () => {
      expect(new InverseExpression([4]).valueOf()).toEqual(0.25);
    });

    it('explains itself', () => {
      expect(new InverseExpression([4]).explain()).toEqual('4^-1');
    });

    it('allows for Expressions as operands', () => {
      expect(new InverseExpression([new InverseExpression([4])]).valueOf()).toEqual(4);
    });

    it('errors on too few operands', () => {
      expect(() => new InverseExpression([]).valueOf()).toThrow();
    });

    it('errors on too many operands', () => {
      expect(() => new InverseExpression([4, 2]).valueOf()).toThrow();
    });
  });
});
