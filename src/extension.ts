import { ExtensionContext, window, commands, languages, workspace, tasks, WorkspaceConfiguration } from 'vscode';
import {
  executeRecipe,
  executeRunCommand,
  JustCallHierarchyProvider,
  JustCodeLensProvider,
  JustCompletionItemProvider,
  JustDocumentFormattingEditProvider,
  JustDocumentSemanticTokensProvider,
  JustDocumentSymbolProvider,
  JustTaskProvider,
} from './vscode';
import { enableJustUnstableFeatures, setJustExecutable, setJustShell } from './just';
import { Recipe } from './types';
import { justfileLegend } from './vscode/documentSemanticTokensProvider';

/**
 * The channel we'll be writing our output to.
 */
const OUTPUT_CHANNEL_NAME = 'Just';

const settingSectionID = 'just';

const languageID = 'justfile';

/**
 * The command key for running a just recipe.
 * 
 * This needs to match up in two places in our `package.json`.
 */
const RUN_RECIPE_COMMAND_KEY = 'just.run';

const ENABLE_CODELENS_COMMAND_KEY = 'just.enableCodeLens';
const DISABLE_CODELENS_COMMAND_KEY = 'just.disableCodeLens';
const CODELENS_ACTION_COMMAND_KEY = "just.codelensAction";

/**
 * Fires the first time our extension loads.
 *
 * @param context The vscode context.
 */
export function activate(context: ExtensionContext) {
  // the output channel we'll be writing to when we run tasks
  const outputChannel = window.createOutputChannel(OUTPUT_CHANNEL_NAME);

  updateJustSettings(workspace.getConfiguration(settingSectionID));

  const codelensProvider = new JustCodeLensProvider();

  const docSelector = { scheme: 'file', language: languageID };

  // register a command which will allow us to run a recipe
  context.subscriptions.push(
    outputChannel,
    codelensProvider,

    languages.registerCodeLensProvider(languageID, codelensProvider),
    languages.registerDocumentFormattingEditProvider(languageID, new JustDocumentFormattingEditProvider(outputChannel)),
    languages.registerDocumentSemanticTokensProvider(docSelector, new JustDocumentSemanticTokensProvider(outputChannel), justfileLegend),
    languages.registerDocumentSymbolProvider(docSelector, new JustDocumentSymbolProvider(),),
    languages.registerCallHierarchyProvider(docSelector, new JustCallHierarchyProvider()),
    languages.registerCompletionItemProvider(docSelector, new JustCompletionItemProvider(), ...JustCompletionItemProvider.triggerCharacters()),

    workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(settingSectionID)) {
        updateJustSettings(workspace.getConfiguration(settingSectionID));
      }
    }),

    tasks.registerTaskProvider("just", new JustTaskProvider()),

    commands.registerCommand(RUN_RECIPE_COMMAND_KEY, async () => {
      await executeRunCommand(outputChannel, window?.activeTextEditor?.document?.fileName);
    }),

    commands.registerCommand(ENABLE_CODELENS_COMMAND_KEY, () => {
      workspace.getConfiguration(settingSectionID).update("enableCodeLens", true, true);
    }),

    commands.registerCommand(DISABLE_CODELENS_COMMAND_KEY, () => {
      workspace.getConfiguration(settingSectionID).update("enableCodeLens", false, true);
    }),

    commands.registerCommand(CODELENS_ACTION_COMMAND_KEY, async (recipe?: Recipe, workingDirectory?: string) => {
      if (recipe) {
        outputChannel.appendLine(`CodeLens action clicked with justfile=${recipe.justfile} recipe=${recipe.name}`);
        await executeRecipe(recipe, outputChannel, workingDirectory);
      }
    }),
  );

}

function updateJustSettings(config: WorkspaceConfiguration) {
  const justExe = config.get('justExecutable', 'just');
  setJustExecutable(justExe);
  const justShell = config.get('justShell', '');
  setJustShell(justShell);
  const justUnstableFeatures = config.get<boolean>('justUnstableFeatures', false);
  enableJustUnstableFeatures(justUnstableFeatures);
}

/**
 * Fires when our extension dies.
 */
export function deactivate() {
}
