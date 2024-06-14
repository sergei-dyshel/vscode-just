import { CancellationToken, ProcessExecution, ProviderResult, Task, TaskDefinition, TaskProvider, TaskScope, workspace } from "vscode";
import { getRecipes } from "../just";

interface JustTaskDefinition extends TaskDefinition {
    /**
     * The recipe name
     */
    recipe: string;

    /**
     * The justfile containing the recipe
     */
    justfile?: string;

    /**
     * Use <WORKING-DIRECTORY> as working directory. justfile must also be set
     */
    workingDirectory?: string;

    /**
     * Override <VARIABLE> with <VALUE>
     */
    variables?: JustParameters;

    /**
     * Arguments
     */
    args?: string[];

    /**
     * Invoke <SHELL> to run recipes
     */
    shell?: string;

    /**
     * Invoke shell with <SHELL-ARG> as an argument
     */
    shellArgs?: string[];
}

interface JustParameters {
    [s: string]: string;
}

export class JustTaskProvider implements TaskProvider {
    private tasks: Task[] | undefined;
    private justfile: string | undefined;
    private workspaceRoot?: string;

    constructor() {
        if (workspace.workspaceFolders) {
            this.workspaceRoot = workspace.workspaceFolders[0]?.uri?.fsPath;
        }
    }

    provideTasks(token: CancellationToken): ProviderResult<Task[]> {
        try {
            return this.getTasks();
        } catch (e) {
            console.error('provideTasks:', e);
            return [];
        }
    }

    resolveTask(task: Task, token: CancellationToken): ProviderResult<Task> | undefined {
        if (task.definition.type === 'just') {
            try {
                const _task = this.getTask(task.definition as JustTaskDefinition, task);
                return _task;
            } catch (error) {
                console.error('resolveTask:', error);
            }
        }

        return undefined;
    }

    async getTasks(): Promise<Task[] | undefined> {
        if (this.tasks !== undefined) {
            return this.tasks;
        }

        const result = await getRecipes(this.justfile, this.workspaceRoot);
        if (result.kind === 'ok') {
            this.tasks = result.recipes.map((r) => {
                const definition: JustTaskDefinition = {
                    recipe: r.name,
                    type: 'just',
                };
                return this.getTask(definition);
            });
        }
        return this.tasks;
    }

    getTask(definition: JustTaskDefinition, source?: Task): Task {
        const args: string[] = [];

        if (definition.variables) {
            Object.entries<string>(definition.variables).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    args.push(`--set${key} ${value}`);
                }
            });
        }

        args.push(
            definition.justfile ?? 'just',
            definition.recipe
        );

        if (definition.workingDirectory) {
            args.push('--working-directory', definition.workingDirectory);
        }

        if (definition.shell) {
            args.push('--shell', definition.shell);
        }

        if (definition.shellArgs) {
            definition.shellArgs.forEach(arg => {
                args.push('--shell-arg', arg);
            });
        }

        if (definition.args) {
            definition.args.forEach(arg => args.push(arg));
        }

        const justExe = workspace.getConfiguration("just").get('justExecutable', 'just');
        const taskScope = source?.scope ?? TaskScope.Workspace;

        return new Task(
            definition,
            taskScope,
            definition.recipe,
            justExe,
            new ProcessExecution(justExe, args, { cwd: this.workspaceRoot })
        );
    }
}