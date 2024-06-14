import {
    CancellationToken,
    CompletionContext,
    CompletionItem,
    CompletionItemKind,
    CompletionItemProvider,
    CompletionList,
    CompletionTriggerKind,
    Position,
    ProviderResult,
    SnippetString,
    TextDocument,
} from "vscode";
import { attributes, functions } from "../completion";

export class JustCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionList<CompletionItem> | CompletionItem[]> {
        switch (context.triggerKind) {
            case CompletionTriggerKind.Invoke:
                return JustCompletionItemProvider.functions();
            case CompletionTriggerKind.TriggerForIncompleteCompletions:
                if (position.character === 0) {
                    return JustCompletionItemProvider.keywords();
                }

                return this._provideCompletionItems(document, position);
            case CompletionTriggerKind.TriggerCharacter:
                switch (context.triggerCharacter) {
                    case "[":
                        if (position.character == 1) {
                            return JustCompletionItemProvider.attributes();
                        }
                        break;
                    case "+":
                        return JustCompletionItemProvider.functions();
                    default:
                        break;
                }
                break;

            default:
                break;
        }
        return [];
    }

    // resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    //     throw new Error("Method not implemented.");
    // }

    private _provideCompletionItems(document: TextDocument, position: Position): ProviderResult<CompletionList<CompletionItem> | CompletionItem[]> {
        const line = document.lineAt(position.line);

        if (line.text.startsWith("set ")) {
            const result = new CompletionList<CompletionItem>([],);

            if (line.text.includes(":=")) {
                const [_, _0, setting,] = line.text.split(/( |:)/, 3);

                if (booleanSettings.includes(setting)) {

                    result.items.push(
                        new CompletionItem("false", CompletionItemKind.Value),
                        new CompletionItem("true", CompletionItemKind.Value),
                    );
                }

                return result;
            }

            booleanSettings.forEach((setting) => {
                const item = new CompletionItem(setting, CompletionItemKind.Constant);
                // item.insertText = setting;
                result.items.push(item);
            });

            stringSettings.forEach((setting) => {
                const item = new CompletionItem(setting, CompletionItemKind.Constant);
                // item.insertText = setting;
                result.items.push(item);
            });

            stringArraySettings.forEach((setting) => {
                const item = new CompletionItem(setting, CompletionItemKind.Constant);
                // item.insertText = setting;
                result.items.push(item);
            });

            return result;
        }


        // if (line.text.startsWith("alias ")) {
        //     if (line.text.includes(":=")) {

        //     }
        // }

        return [];
    }

    static triggerCharacters(): string[] {
        return [
            "(",
            "[",
            "{",
            ",",
            "+",
        ];
    }

    static _keywords: CompletionItem[];
    static _attributes: CompletionItem[];
    static _functions: CompletionItem[];

    static keywords(): CompletionItem[] {
        if (!this._keywords) {
            this._keywords = keywords.map((keyword) => {
                const item = new CompletionItem(keyword, CompletionItemKind.Keyword);
                // item.insertText = keyword;
                item.documentation = "";
                return item;
            });
        }

        return this._keywords;
    }

    static attributes(): CompletionItem[] {
        if (!this._attributes) {
            this._attributes = attributes.map((attribute) => {
                const item = new CompletionItem(attribute.name, CompletionItemKind.TypeParameter);
                item.detail = attribute.detail;
                if (attribute.insertText) {
                    item.insertText = new SnippetString(attribute.insertText);
                }
                return item;
            });
        }

        return this._attributes;
    }
    static functions(): CompletionItem[] {
        if (!this._functions) {
            this._functions = functions.map((func) => {
                const item = new CompletionItem(func.name, CompletionItemKind.Function);
                item.detail = func.detail;
                item.documentation = func.documentation;
                if (!func.minArgc) {
                    item.insertText = func.name + "()";
                } else {
                    let s = func.name + "($1";
                    for (let i = 2; i <= func.minArgc; i++) {
                        s += ", $" + i.toString();
                    }
                    s += ")";
                    item.insertText = new SnippetString(s);
                }
                return item;
            });
        }

        return this._functions;
    }
}

const keywords = [
    'set',
    'alias',
    'import',
    'export',
    'mod',
];

// https://just.systems/man/en/chapter_27.html

const booleanSettings: string[] = [
    'allow-duplicate-recipes',
    'dotenv-load',
    'export',
    'fallback',
    'ignore-comments',
    'positional-arguments',
    'quiet',
    'windows-powershell',
];

const stringSettings: string[] = [
    'dotenv-filename',
    'dotenv-path',
    'tempdir',
];

const stringArraySettings: string[] = [
    'shell',
    'windows-shell',
];
