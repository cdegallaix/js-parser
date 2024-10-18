# Javascript Expression Evaluator

This is very simple javascript expression evaluator. It can evaluate simple mathematical expressions or logical expressions.
The idea is to evaluate the expression in a single pass. The expression is tokenized and then evaluated.

This is a very basic implementation to demonstrate the concepts of tokenization and evaluation of expressions (using Abstract Syntax Tree).

Examples:

```javascript
const expression = '1 + 2 * 3';
const result = evaluate(expression);
console.log(result); // 7
```

```javascript
const expression = '1 + 2 * 3 > 5';
const result = evaluate(expression);
console.log(result); // true
```

## Supported Operators

-   Arithmetic Operators: +, -, \*, /
-   Logical Operators: &&, ||, !
-   Comparison Operators: ==, !=, <, <=, >, >=
-   Parentheses: (, )

## Supported Data Types

-   Numbers
-   Booleans
-   Strings (variables - very basic support)
