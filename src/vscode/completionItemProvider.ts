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
    TextDocument,
} from "vscode";

export class JustCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionList<CompletionItem> | CompletionItem[]> {
        switch (context.triggerKind) {
            case CompletionTriggerKind.Invoke:
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
        ];
    }

    static _keywords: CompletionItem[];
    static _attributes: CompletionItem[];

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
                const item = new CompletionItem(attribute, CompletionItemKind.TypeParameter);
                // item.insertText = attribute;
                item.documentation = "";
                return item;
            });
        }

        return this._attributes;
    }
}

const keywords = [
    'set',
    'alias',
    'import',
    'export',
    'mod',
];

const attributes = [
    "confirm", // Require confirmation prior to executing recipe.
    'confirm("prompt")', // Require confirmation prior to executing recipe with a custom prompt.
    "linux", // Enable recipe on Linux.
    "macos", // Enable recipe on MacOS.
    "no-cd", // Don’t change directory before executing recipe.
    "no-exit-message", // Don’t print an error message if recipe fails.
    "no-quiet", // Override globally quiet recipes and always echo out the recipe.
    "private", // See Private Recipes.
    "unix", // Enable recipe on Unixes. (Includes MacOS).
    "windows", // Enable recipe on Windows.
];

const functions = [
    "arch", // arch() — Instruction set architecture. Possible values are: "aarch64", "arm", "asmjs", "hexagon", "mips", "msp430", "powerpc", "powerpc64", "s390x", "sparc", "wasm32", "x86", "x86_64", and "xcore".
    "num_cpus", // num_cpus()1.15.0 - Number of logical CPUs.
    "os", // os() — Operating system. Possible values are: "android", "bitrig", "dragonfly", "emscripten", "freebsd", "haiku", "ios", "linux", "macos", "netbsd", "openbsd", "solaris", and "windows".
    "os_family", // os_family() — Operating system family; possible values are: "unix" and "windows".

    "justfile",// justfile() - Retrieves the path of the current justfile.
    "justfile_directory",// justfile_directory() - Retrieves the path of the parent directory of the current justfile.
];

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
