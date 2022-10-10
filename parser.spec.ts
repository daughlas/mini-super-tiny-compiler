import { test, expect } from 'vitest'
import { parser } from './parser'
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
                    type: 'CallExpression',
                    name: 'add',
                    params: [
                        {
                            type: 'NumberLiteral',
                            value: '2'
                        },
                        {
                            type: 'CallExpression',
                            name: 'subtract',
                            params: [
                                {
                                    type: 'NumberLiteral',
                                    value: '4'
                                },
                                {
                                    type: 'NumberLiteral',
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
        type: 'Program',
        body: [
            {
                type: 'Number',
                value: '2'
            }
        ]
    }
})