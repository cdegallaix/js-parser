import parser from './parser';

export function evaluate(expression: string): unknown {
    const tree = parser.parse(expression);

    // we don't manage multiple expressions
    if (tree.length !== 1) {
        throw new Error('Invalid expression');
    }

    const expr = tree[0];

    if (!expr.isValid()) {
        throw new Error('Invalid expression');
    }

    return expr.visit();
}
