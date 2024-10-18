import { operatorsPrecedence } from './config';
import { INode } from './nodes/INode';
import { NumberNode } from './nodes/NumberNode';
import { OperatorNode } from './nodes/OperatorNode';
import { VariableNode } from './nodes/VariableNode';
import { Token, tokenizer } from './tokenizer';

/**
 * Parse an expression and return a tree.
 * Generate AST (Abstract Syntax Tree) from an expression.
 * https://en.wikipedia.org/wiki/Abstract_syntax_tree
 */
class Parser {
    private tokens: Token[];
    private index: number;
    private tree: INode[];

    constructor() {}

    parse(expression: string): INode[] {
        this.tokens = tokenizer(expression);
        this.index = 0;
        this.tree = [];

        while (this.index < this.tokens.length) {
            const expr = this.operation();

            if (expr) {
                this.tree.push(expr);
            }
        }

        return this.tree;
    }

    move(): void {
        this.index++;
    }

    current(): Token | undefined {
        return this.tokens[this.index];
    }

    operation(level = 0): INode | undefined {
        const hasNextLevel = operatorsPrecedence[level + 1] !== undefined;

        const left = hasNextLevel ? this.operation(level + 1) : this.primary();

        if (this.current() && operatorsPrecedence[level].includes(this.current().value)) {
            const current = this.current();
            this.move();
            const right = hasNextLevel ? this.operation() : this.primary();

            return new OperatorNode(current.value, left, right);
        }

        return left;
    }

    primary(): INode | undefined {
        const token = this.current();
        this.move();

        if (!token) {
            return;
        }

        if (token.type === 'number') {
            return new NumberNode(token.value);
        }

        if (token.type === 'variable') {
            return new VariableNode(token.value);
        }

        if (token.type === 'open-group') {
            const expr = this.operation();
            this.move();
            return expr;
        }

        if (token.type === 'operator' && token.value === '!') {
            const right = this.primary();

            return new OperatorNode(token.value, null, right);
        }
    }
}

export default new Parser();
