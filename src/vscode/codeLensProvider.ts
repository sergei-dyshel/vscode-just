import { CancellationToken, CodeLens, ProviderResult, Disposable, workspace, CodeLensProvider, EventEmitter, Event, TextDocument, Position } from 'vscode';
import { getRecipeName, getRecipes, parseJustfile } from '../grammar';
import { dirname } from 'path';

/**
 * CodelensProvider
 */
export class JustCodeLensProvider implements CodeLensProvider, Disposable {
    private disposable: Disposable | undefined;
    private _onDidChangeCodeLenses: EventEmitter<void>;
    public readonly onDidChangeCodeLenses: Event<void>;

    constructor() {
        this._onDidChangeCodeLenses = new EventEmitter<void>();
        this.onDidChangeCodeLenses = this._onDidChangeCodeLenses.event;
        this.disposable = workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }

    dispose() {
        this._onDidChangeCodeLenses.dispose();

        if (this.disposable) {
            this.disposable.dispose();
            this.disposable = undefined;
        }
    }

    public provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
        if (workspace.getConfiguration("just").get("enableCodeLens", true)) {
            const codeLenses: CodeLens[] = [];

            const justfile = document.getText();
            const ctx = parseJustfile(justfile);

            getRecipes(ctx).forEach((recipe) => {
                const recipeName = recipe.recipeName();
                const pos = new Position(recipeName.start.line - 1, recipeName.start.column);

                const range = document.getWordRangeAtPosition(pos);
                if (range) {
                    codeLenses.push(
                        new CodeLens(range, {
                            title: "Run Recipe",
                            tooltip: "Run Recipe with default default parameters",
                            command: "just.codelensAction",
                            arguments: [
                                {
                                    name: getRecipeName(recipe),
                                    justfile: document.fileName,
                                },
                                dirname(document.fileName),
                            ],
                        }));
                }
            });

            return codeLenses;
        }
        return [];
    }

    public resolveCodeLens(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens> {
        if (workspace.getConfiguration("just").get("enableCodeLens", true)) {
            if (!codeLens.command) {
                codeLens.command = {
                    title: "Run Recipe",
                    tooltip: "Run Recipe with default default parameters",
                    command: "just.codelensAction",
                    arguments: ["Argument 1", false]
                };
            }
            return codeLens;
        }
        return null;
    }
}
