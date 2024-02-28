import { ParserRuleContext, TerminalNode, Token } from "antlr4";
import { Position, Range, SymbolKind } from "vscode";
import { AssignmentContext, ExportStatementContext, RecipeContext, SettingStatementContext,  } from "../grammar/JustfileParser";
import { positionOfTokenEnd, positionOfTokenStart } from '../grammar';

export function rangeFromRuleContext(ctx: ParserRuleContext): Range {
    return rangeFromToken(ctx.start, ctx.stop);
}

export interface SymbolInfo {
    name: string
    kind: SymbolKind
    containerName?: string
}

export function symbolicNameFromToken(ctx: ParserRuleContext): SymbolInfo | null {
    try {
        if (ctx instanceof RecipeContext) {
            const recipeName = ctx.recipeName().getText();
            const parameters = ctx.parameter_list().map((p) => { return p.parameterName().getText(); });
            const variadic = ctx.variadic();
            let v = "";
            if (variadic) {
                if (parameters.length > 0) {
                    v += ", ";
                }
                v += variadic.variadicModifier().getText() + variadic.parameter().parameterName().getText();
            }
            return {
                name: `recipe ${recipeName}(${parameters.join(', ')}${v})`,
                kind: SymbolKind.Method,
            };
        }
        if (ctx instanceof ExportStatementContext) {
            return symbolicNameFromToken(ctx.assignment());
        }
        if (ctx instanceof AssignmentContext) {
            return { name: ctx.variableName().getText(), kind: SymbolKind.Variable };
        }
        if (ctx instanceof SettingStatementContext) {
            return { name: (ctx.booleanSettingNames() || ctx.stringSettingNames() || ctx.stringSeqSettingNames()).getText(), kind: SymbolKind.Field };
        }
    } catch (error) {
        console.debug(error);
    }

    return null;
}

export function rangeFromTerminalNode(node: TerminalNode): Range {
    return rangeFromToken(node.symbol);
}

export function rangeFromToken(start: Token, end?: Token): Range {
    const startPos = positionOfTokenStart(start);
    const endPos = positionOfTokenEnd(end || start);

    return new Range(
        new Position(startPos.line, startPos.character),
        new Position(endPos.line, endPos.character),
    );
}
