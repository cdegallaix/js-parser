import { isNumber } from '../utils';
import { INode } from './INode';

export class NumberNode implements INode {
    value: number;

    constructor(value: string) {
        const valueAsNumber = parseFloat(value);
        this.value = valueAsNumber;
    }

    visit(): unknown {
        return this.value;
    }

    isValid(): boolean {
        return isNumber(this.value.toString());
    }
}
