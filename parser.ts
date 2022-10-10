import { Token, TokenTypes } from "./tokenizer";


export enum NodeTypes {
    Root,
    Number,
    Expression
}

interface Node {
    type: NodeTypes;
}

type BodyElement = NumberNode | CallExpressionNode;

interface RootNode extends Node {
    body: BodyElement[];
}
interface NumberNode extends Node {
    value: string;
}

type CallExpressionChildNode = NumberNode | CallExpressionNode;

interface CallExpressionNode extends Node {
    name: string;
    params: CallExpressionChildNode[]
}

function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: []
    }
}

function createNumberNode(value: string) {
    return {
        type: NodeTypes.Number,
        value: value
    }
}

function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.Expression,
        name,
        params: []
    }
}

// TODO 优化下
export function parser(tokens: Token[]): any {
    let current = 0;
    const rootNode = createRootNode();

    function walk() {

        let token = tokens[current];
        if (token.type === TokenTypes.Number) {
            current++;
            return createNumberNode(token.value);
        }

        if (token.type === TokenTypes.Paren && token.value === '(') {
            token = tokens[++current];
            const node = createCallExpressionNode(token.value);

            token = tokens[++current];

            while (!(token.type === TokenTypes.Paren && token.value === ')')) {
                node.params.push(walk())
                token = tokens[current];
            }
            current++;
            return node;
        }

        throw new Error(`无法识别 token ${token}`);

    }

    while (current < tokens.length) {
        rootNode.body.push(walk());
    }
    return rootNode;
}