import { test, expect } from 'vitest'
import { NodeTypes, parser } from './parser'
import { tokenizer, TokenTypes } from './tokenizer'
test.skip(
    'parser', () => {
        const tokens = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Number, value: '2' },
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'subtract' },
            { type: TokenTypes.Number, value: '4' },
            { type: TokenTypes.Number, value: '2' },
            { type: TokenTypes.Paren, value: ')' },
            { type: TokenTypes.Paren, value: ')' },
        ]

        const ast = {
            type: 'Program',
            body: [
                {
                    type: NodeTypes.Expression,
                    name: 'add',
                    params: [
                        {
                            type: NodeTypes.Number,
                            value: '2'
                        },
                        {
                            type: NodeTypes.Expression,
                            name: 'subtract',
                            params: [
                                {
                                    type: NodeTypes.Number,
                                    value: '4'
                                },
                                {
                                    type: NodeTypes.Number,
                                    value: '2'
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        expect(parser(tokens)).toEqual(ast)
    }
)

test('number', () => {
    const tokens = [
        { type: TokenTypes.Number, value: '2' }
    ]

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.Number,
                value: '2'
            }
        ]
    }
})

test('callExpression', () => {
    const tokens = [
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'add' },
        { type: TokenTypes.Number, value: '2' },
        { type: TokenTypes.Number, value: '4' },
        { type: TokenTypes.Paren, value: ')' },
    ]

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.Expression,
                name: 'add',
                params: [
                    {
                        type: NodeTypes.Number,
                        value: '2'
                    },
                    {
                        type: NodeTypes.Number,
                        value: '4'
                    }
                ]
            }
        ]
    }

    expect(parser(tokens)).toEqual(ast)
});


test('two callExpression', () => {
    const tokens = [
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'add' },
        { type: TokenTypes.Number, value: '2' },
        { type: TokenTypes.Number, value: '4' },
        { type: TokenTypes.Paren, value: ')' },
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'add' },
        { type: TokenTypes.Number, value: '1' },
        { type: TokenTypes.Number, value: '3' },
        { type: TokenTypes.Paren, value: ')' },
    ]

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.Expression,
                name: 'add',
                params: [
                    {
                        type: NodeTypes.Number,
                        value: '2'
                    },
                    {
                        type: NodeTypes.Number,
                        value: '4'
                    }
                ]
            },
            {
                type: NodeTypes.Expression,
                name: 'add',
                params: [
                    {
                        type: NodeTypes.Number,
                        value: '1'
                    },
                    {
                        type: NodeTypes.Number,
                        value: '3'
                    }
                ]
            }
        ]
    }

    expect(parser(tokens)).toEqual(ast)
})