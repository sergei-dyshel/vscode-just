import { CharStream, CommonTokenStream, TerminalNode, Token } from "antlr4";
import JustfileLexer from "./JustfileLexer";
import JustfileParser, {
    DependencyContext,
    ItemDocumentationContext,
    JustfileContext,
    RecipeContext
} from "./JustfileParser";

export interface ParseOptions {
    /**
     * If true, check for syntax errors in the justfile.
     * @default false
     */
    checkSyntaxErrors: boolean
}

/**
 * Parse a justfile.
 * @param justfile The contents of the justfile.
 * @param opts The options to use when parsing the justfile.
 * @returns The parsed justfile context.
 */
export function parseJustfile(justfile: string, opts?: ParseOptions): JustfileContext {
    const lexer = new JustfileLexer(new CharStream(justfile));
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new JustfileParser(tokenStream);

    const ctx = parser.justfile();
    if (opts?.checkSyntaxErrors) {
        if (parser.syntaxErrorsCount > 0) {
            throw new Error(`syntaxErrorsCount: ${parser.syntaxErrorsCount}`);
        }
    }
    return ctx;
}

export function getRecipes(ctx: JustfileContext): RecipeContext[] {
    const items = ctx.item_list();
    const recipes = items?.map((c) => c.recipe()).filter((c) => c);

    return recipes;
}

export function getRecipeName(ctx: RecipeContext | DependencyContext): string {
    return ctx.recipeName().getText();
}
export function getRecipeDependencies(ctx: RecipeContext): string[] {
    return ctx.dependency_list()?.map((c) => c.recipeName().getText());
}

export class RecipeWarpper {
    constructor(public ctx: RecipeContext) { }

    name(): string {
        return getRecipeName(this.ctx);
    }
}

export interface Pos {
    line: number
    character: number;
}

export function positionOfTokenStart(start: Token): Pos {
    return {
        line: start.line - 1,
        character: start.column,
    };
}

export function positionOfTokenEnd(end: Token): Pos {
    let endLine = end.line - 1;
    let endColumn = end.column;

    switch (end.type) {
        case JustfileLexer.STRING:
        case JustfileLexer.INDENTED_STRING:
        case JustfileLexer.RAW_STRING:
        case JustfileLexer.INDENTED_RAW_STRING:
        case JustfileLexer.BACKTICK:
        case JustfileLexer.INDENTED_BACKTICK:
            const s = end.text;

            for (let index = 0; index < s.length; index++) {
                const ch = s[index];
                if (ch === '\n') {
                    endLine++;
                    endColumn = 0;
                } else {
                    endColumn++;
                }
            }

            break;

        default:
            endColumn += (end.stop - end.start + 1);
            break;
    }

    return {
        line: endLine,
        character: endColumn,
    };
}

export interface DocumentationItem {
    itemDocumentation(): ItemDocumentationContext
}

export function listComments(item: DocumentationItem): Array<TerminalNode> {
    const comments: Array<TerminalNode> = [];
    const doc = item.itemDocumentation();
    if (doc) {
        doc.COMMENT_list()?.forEach((comment) => {
            comments.push(comment);
            // this._pushSemanticTerminalNodeToken(builder, comment, "comment");
        });
    }
    return comments;
}