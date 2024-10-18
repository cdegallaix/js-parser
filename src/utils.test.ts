import { describe, expect, it } from 'vitest';
import { isNumber } from './utils';

describe('utils', () => {
    it('should be a number', () => {
        expect(isNumber('1')).toBe(true);
        expect(isNumber('1.1')).toBe(true);
        expect(isNumber('abc')).toBe(false);
    });
});
