import { describe, expect, it } from 'vitest';
import { tokenizer } from './tokenizer';

describe('Tokenizer', () => {
    it('should tokenize a simple string', () => {
        const tokens = tokenizer('1 + 2');
        expect(tokens).toEqual([
            { type: 'number', value: '1' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
        ]);
    });

    it('should tokenize a string with variables', () => {
        const tokens = tokenizer('1 + $today');
        expect(tokens).toEqual([
            { type: 'number', value: '1' },
            { type: 'operator', value: '+' },
            { type: 'variable', value: '$today' },
        ]);
    });

    it('should tokenize a string with groups', () => {
        const tokens = tokenizer('(1 + 2)');
        expect(tokens).toEqual([
            { type: 'open-group', value: '(' },
            { type: 'number', value: '1' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'close-group', value: ')' },
        ]);
    });

    it('should tokenize a string with groups and variables', () => {
        const tokens = tokenizer('($today + 2)');
        expect(tokens).toEqual([
            { type: 'open-group', value: '(' },
            { type: 'variable', value: '$today' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'close-group', value: ')' },
        ]);
    });

    it('should tokenize a string with groups and variables and operators', () => {
        const tokens = tokenizer('($today + 2) * 3');
        expect(tokens).toEqual([
            { type: 'open-group', value: '(' },
            { type: 'variable', value: '$today' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'close-group', value: ')' },
            { type: 'operator', value: '*' },
            { type: 'number', value: '3' },
        ]);
    });

    it('should tokenize a string with groups and variables and operators and groups', () => {
        const tokens = tokenizer('($today + 2) * (3 - 1)');
        expect(tokens).toEqual([
            { type: 'open-group', value: '(' },
            { type: 'variable', value: '$today' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
            { type: 'close-group', value: ')' },
            { type: 'operator', value: '*' },
            { type: 'open-group', value: '(' },
            { type: 'number', value: '3' },
            { type: 'operator', value: '-' },
            { type: 'number', value: '1' },
            { type: 'close-group', value: ')' },
        ]);
    });

    it('should tokenize a string with invalid group', () => {
        const tokens = tokenizer('($today + 2');
        expect(tokens).toEqual([
            { type: 'open-group', value: '(' },
            { type: 'variable', value: '$today' },
            { type: 'operator', value: '+' },
            { type: 'number', value: '2' },
        ]);
    });
});
