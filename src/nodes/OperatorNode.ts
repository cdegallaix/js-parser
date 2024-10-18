import { operators } from '../config';
import { INode } from './INode';

export class OperatorNode implements INode {
    value: unknown;
    left: INode;
    right: INode;

    constructor(value: unknown, left: INode, right: INode) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    visit(): unknown {
        switch (this.value) {
            case '+':
                return (this.left.visit() as number) + (this.right.visit() as number);
            case '-':
                return (this.left.visit() as number) - (this.right.visit() as number);
            case '*':
                return (this.left.visit() as number) * (this.right.visit() as number);
            case '/':
                return (this.left.visit() as number) / (this.right.visit() as number);
            case '<':
                return this.left.visit() < this.right.visit();
            case '>':
                return this.left.visit() > this.right.visit();
            case '<=':
                return this.left.visit() <= this.right.visit();
            case '>=':
                return this.left.visit() >= this.right.visit();
            case '==':
                return this.left.visit() === this.right.visit();
            case '!=':
                return this.left.visit() !== this.right.visit();
            case '&&':
                return this.left.visit() && this.right.visit();
            case '||':
                return this.left.visit() || this.right.visit();
            case '!':
                return !this.right.visit();
            default:
                return;
        }
    }

    isValid(): boolean {
        return operators.includes(this.value) && this.right.isValid() && this.left ? this.left.isValid() : true;
    }
}
