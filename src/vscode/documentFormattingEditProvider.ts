import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, OutputChannel, ProviderResult, Range, TextDocument, TextEdit } from "vscode";
import { execJust } from "../just";
import { open } from "fs";
import { unlink, writeFile } from "fs/promises";

export class JustDocumentFormattingEditProvider implements DocumentFormattingEditProvider {

    constructor(private outputChannel: OutputChannel) {
    }

    provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
        return this.dumpJustfile(document);
    }

    async dumpJustfile(document: TextDocument): Promise<TextEdit[]> {
        const swapFileName = document.fileName + ".swap";

        try {
            await writeFile(swapFileName, document.getText(), { flag: 'w+' });
        } catch (err) {
            this.outputChannel.appendLine("Failed to write to file: " + swapFileName + `, Error: ${err}`);
            return [];
        }

        const result = await execJust(['--justfile', swapFileName, '--dump', '--dump-format', 'just']);

        await unlink(swapFileName);

        if (result.exitCode === 0) {
            const wholeRange = new Range(
                document.positionAt(0),
                document.lineAt(document.lineCount - 1).range.end,
            );

            return [TextEdit.replace(wholeRange, result.stdout || '')];
        }

        return [];
    }
}