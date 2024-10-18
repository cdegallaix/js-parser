export const operatorsPrecedence = [
    ['+', '-'],
    ['*', '/'],
    ['!', '&&', '||'],
    ['<', '>', '<=', '>=', '==', '!='],
];

// @ts-expect-error
export const operators = operatorsPrecedence.flat();
export const groups = ['(', ')'];
