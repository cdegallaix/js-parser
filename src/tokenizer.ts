import { groups, operators } from './config';
import { isNumber } from './utils';

export type TokenType = 'number' | 'operator' | 'open-group' | 'close-group' | 'variable';
export type Token = { type: TokenType; value: string };

/**
 * Transform an expression to an array of tokens.
 * A token is an object with a type and a value.
 * Type can be: number, operator, open-group, close-group, variable.
 * Value is the actual value of the token.
 * @param {string} expression
 * @returns {Array<{type: string, value: string}>}
 */
export function tokenizer(expression: string): Token[] {
    const tokens: Token[] = [];
    let currentToken: string = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        currentToken = (currentToken + char).trim();
        const peek = expression[i + 1];

        if (currentToken === '') {
            continue;
        }

        if (groups.includes(currentToken)) {
            tokens.push({
                type: currentToken === '(' ? 'open-group' : 'close-group',
                value: currentToken,
            });

            currentToken = '';
        } else if (operators.find((x: string) => x.startsWith(currentToken))) {
            if (peek !== undefined && operators.includes(currentToken + peek)) {
                continue;
            }

            // we need to check if the token is a valid operator because we only
            // checked with the startWith method earlier
            if (operators.includes(currentToken)) {
                tokens.push({
                    type: 'operator',
                    value: currentToken,
                });
            }

            currentToken = '';
        } else if (isNumber(currentToken.trim())) {
            if (!isNumber(peek)) {
                tokens.push({
                    type: 'number',
                    value: currentToken.trim(),
                });

                currentToken = '';
            }
        } else {
            if (peek === undefined || groups.includes(peek) || operators.find((x: string) => x.startsWith(peek))) {
                tokens.push({
                    type: 'variable',
                    value: currentToken,
                });

                currentToken = '';
            }
        }
    }

    if (currentToken) {
        tokens.push({
            type: 'variable',
            value: currentToken,
        });
    }

    return tokens;
}
