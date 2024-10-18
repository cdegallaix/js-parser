import { describe, expect, it } from 'vitest';
import parser from './parser';
import { OperatorNode } from './nodes/OperatorNode';
import { NumberNode } from './nodes/NumberNode';

describe('Parser', () => {
    it('should parse a simple expression', () => {
        const result = parser.parse('1 + 2');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('+');
        expect(((result[0] as OperatorNode).left as NumberNode).value).toBe(1);
        expect(((result[0] as OperatorNode).right as NumberNode).value).toBe(2);
    });

    it('should parse an expression with variable', () => {
        const result = parser.parse('1 + $today');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('+');
        expect(((result[0] as OperatorNode).left as NumberNode).value).toBe(1);
        expect(((result[0] as OperatorNode).right as NumberNode).value).toBe('$today');
    });

    it('should parse an expression with operator priority', () => {
        const result = parser.parse('1 + 2 * 3');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('+');
        expect(((result[0] as OperatorNode).left as NumberNode).value).toBe(1);
        expect(((result[0] as OperatorNode).right as OperatorNode).value).toBe('*');
        expect((((result[0] as OperatorNode).right as OperatorNode).left as NumberNode).value).toBe(2);
        expect((((result[0] as OperatorNode).right as OperatorNode).right as NumberNode).value).toBe(3);
    });

    it('should parse a simple expression with grouping', () => {
        const result = parser.parse('(1 + 2)');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('+');
        expect(((result[0] as OperatorNode).left as NumberNode).value).toBe(1);
        expect(((result[0] as OperatorNode).right as NumberNode).value).toBe(2);
    });

    it('should parse an expression with grouping and operator priority', () => {
        const result = parser.parse('(1 + 2) * 3');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('*');
        expect(((result[0] as OperatorNode).left as OperatorNode).value).toBe('+');
        expect((((result[0] as OperatorNode).left as OperatorNode).left as NumberNode).value).toBe(1);
        expect((((result[0] as OperatorNode).left as OperatorNode).right as NumberNode).value).toBe(2);
        expect(((result[0] as OperatorNode).right as NumberNode).value).toBe(3);
    });

    it('should parse an expression with a negation operator', () => {
        const result = parser.parse('!(1 + 2)');

        expect(result.length).toBe(1);
        expect(result[0]).instanceOf(OperatorNode);
        expect((result[0] as OperatorNode).value).toBe('!');
        expect((result[0] as OperatorNode).left).toBeNull();
        expect(((result[0] as OperatorNode).right as OperatorNode).value).toBe('+');
        expect((((result[0] as OperatorNode).right as OperatorNode).left as NumberNode).value).toBe(1);
        expect((((result[0] as OperatorNode).right as OperatorNode).right as NumberNode).value).toBe(2);
    });
});
