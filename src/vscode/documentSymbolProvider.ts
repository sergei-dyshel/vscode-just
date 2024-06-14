import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, SymbolInformation, TextDocument, Location, } from "vscode";
import { parseJustfile } from "../grammar";
import { rangeFromRuleContext, symbolicNameFromToken } from "./misc";
import { ParserRuleContext } from "antlr4";

/**
 * JustDocumentSymbolProvider
 */
export class JustDocumentSymbolProvider implements DocumentSymbolProvider {
    provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
        const ctx = parseJustfile(document.getText());
        const symbols: SymbolInformation[] = [];

        ctx.item_list().forEach((item) => {
            if (item.children == null) {
                return;
            }
            for (let index = 0; index < item.children.length; index++) {
                const pt = item.children[index];

                if (pt instanceof ParserRuleContext) {
                    const info = symbolicNameFromToken(pt);
                    if (info) {
                        const symbol = new SymbolInformation(
                            info.name,
                            info.kind,
                            "",
                            // info.containerName || info.name,
                            new Location(document.uri, rangeFromRuleContext(pt))
                        );
                        symbols.push(symbol);
                    }
                    break;
                }
            }
        });

        return symbols;
    }
}
