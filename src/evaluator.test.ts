import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluator';

describe('Evaluator', () => {
    it('should evaluate a simple expression', () => {
        expect(evaluate('1 + 2')).toBe(3);
    });

    it('should evaluate an expression with operator prio', () => {
        expect(evaluate('1 + 2 * 3')).toBe(7);
    });

    it('should evaluate an expression with grouping', () => {
        expect(evaluate('(1 + 2) * 3')).toBe(9);
    });

    it('should evaluate a boolean expression', () => {
        expect(evaluate('(1 + 2) != (2+1)')).toBeFalsy();
    });

    it('should evaluate a boolean expression', () => {
        expect(evaluate('!((1 + 2) != (2+1))')).toBeTruthy();
    });
});
