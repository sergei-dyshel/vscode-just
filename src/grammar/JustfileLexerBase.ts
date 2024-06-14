import {
    CharStream,
    Lexer,
    Token,
} from "antlr4";
import JustfileLexer from "./JustfileLexer";

export default class JustfileLexerBase extends Lexer {
    indent: string;
    tokenQueue: Token[];
    braceDepth: number;


    constructor(input: CharStream) {
        super(input);

        this.indent = '';
        this.tokenQueue = [];
        this.braceDepth = 0;
    }

    reset(): void {
        super.reset();

        this._reset();
    }

    _reset(): void {
        this.indent = '';
        this.tokenQueue = [];
        this.braceDepth = 0;
    }

    nextToken(): Token {
        const loop = true;

        let token: Token | null = this.tokenQueue.shift() || null;

        while (loop) {
            if (!token) {
                token = super.nextToken();
                continue;
            }

            switch (token.type) {
                case JustfileLexer.LeftBrace:
                case JustfileLexer.LeftBracket:
                case JustfileLexer.LeftParen:
                case JustfileLexer.DoubleLeftBrace:
                    this.braceDepth++;
                    return token;
                case JustfileLexer.RightBrace:
                case JustfileLexer.RightBracket:
                case JustfileLexer.RightParen:
                case JustfileLexer.DoubleRightBrace:
                    this.braceDepth--;
                    return token;
                case JustfileLexer.INDENT:

                    this.indent = token.text;
                    this.pushMode(JustfileLexer.RecipeContent);

                    this.getFullRecipeTokens();

                    this.indent = '';
                    this.popMode();
                    return token;
                default:
                    break;
            }
            break;
        }
        return token!;
    }

    _nextTowTokens(token: Token): Token {
        const nextToken = super.nextToken();
        const nextNextToken = super.nextToken();
        if (nextToken.type == token.type && nextNextToken.type == token.type) {
            token.stop = nextNextToken.stop;
        } else {
            this.tokenQueue.push(nextToken);
            this.tokenQueue.push(nextNextToken);
        }
        return token;
    }

    getFullRecipeTokens(): void {
        const loop = true;
        while (loop) {
            // const before = this._tokenStartCharIndex;
            // const beforeLine = this._tokenStartLine;
            // const beforeColumn = this._tokenStartColumn;

            const token = super.nextToken();
            this.tokenQueue.push(token);

            if (token.type == JustfileLexer.EOF) {
                break;
            } else if (token.text === "\n" || token.text === "\r\n") {
                this.tokenQueue.pop();
                token.type = JustfileLexer.NEWLINE;
                this.tokenQueue.push(token);
            } else if (token.column === 0) {
                if (!token.text.startsWith(this.indent)) {
                    // 回退
                    this.tokenQueue.pop();
                    // this._input.seek(before);

                    // (this._interp as any).startIndex = before;
                    // this.line = beforeLine;
                    // this.column = beforeColumn;
                    this._input.seek(token.start);

                    // (this._interp as any).startIndex = token.start;
                    this.line = token.line;
                    this.column = token.column;
                    break;
                } else {
                    this.tokenQueue.pop();
                    const indent = token.cloneWithType(JustfileLexer.INDENT);
                    indent.stop = token.start + this.indent.length - 1;
                    token.start = token.start + this.indent.length;
                    this.tokenQueue.push(indent);
                    this.tokenQueue.push(token);
                }
            }
        }
    }
}
