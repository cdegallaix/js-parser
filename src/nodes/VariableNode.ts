import { INode } from './INode';

export class VariableNode implements INode {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    visit(): unknown {
        // should be managed by an external service / function
        switch (this.value) {
            case '$today':
                return new Date();
            case '$yesterday':
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return yesterday;
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                return null;
        }
    }

    isValid(): boolean {
        return ['$today', '$yesterday', 'true', 'false', 'null', 'undefined'].includes(this.value);
    }
}
