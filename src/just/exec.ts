import { spawn } from 'child_process';

const justOptions: { exe: string, shell: string, unstableFeatures: boolean } = {
    exe: 'just',
    shell: '',
    unstableFeatures: false
};
export function getJustExecutable(): string {
    return justOptions.exe;
}

export function setJustExecutable(just: string) {
    justOptions.exe = just;
}

export function getJustShell(): string {
    return justOptions.shell;
}
export function setJustShell(shell: string) {
    justOptions.shell = shell;
}
export function isJustUnstableFeaturesEnabled(): boolean {
    return justOptions.unstableFeatures;
}

export function enableJustUnstableFeatures(enabled: boolean) {
    justOptions.unstableFeatures = enabled;
}

export interface execOptions {
    /**
    Current working directory of the child process.

    @default process.cwd()
    */
    readonly cwd?: string;

    /**
    Environment key-value pairs. Extends automatically from `process.env`. Set `extendEnv` to `false` if you don't want this.

    @default process.env
    */
    readonly env?: NodeJS.ProcessEnv;

    /**
    On Windows, do not create a new console window. Please note this also prevents `CTRL-C` [from working](https://github.com/nodejs/node/issues/29837) on Windows.

    @default true
    */
    readonly windowsHide?: boolean;
}

export class execResult {
    constructor(
        public command: string,
        public args: string[] | undefined,
        public exitCode: number,
        public stdout?: string,
        public stderr?: string,
    ) { }
}

export async function execJust(args?: string[], options?: execOptions): Promise<execResult> {
    if (justOptions.shell) {
        if (args) {
            const index = args.indexOf("--shell");
            if (index < 0) {
                args = ["--shell", justOptions.shell].concat(args);
            } else {
                console.debug("just shell already set");
            }
        } else {
            args = ["--shell", justOptions.shell];
        }
    }

    if (justOptions.unstableFeatures) {
        if (args) {
            const index = args.indexOf("--unstable");
            if (index < 0) {
                args = ["--unstable"].concat(args);
            }
        }
        else {
            args = ["--unstable"];
        }
    }

    const justExe = getJustExecutable();
    const child = spawn(justOptions.exe, args, options);
    if (child.pid === undefined) {
        const err = await new Promise<JustExecError>((resolve, reject) => {
            child.on('error', (e) => {
                resolve(new JustExecError(e.message, 'no-just', undefined, undefined, justExe, args));
            });

        });
        throw err;
    }

    let stdout = '';
    let stderr = '';
    for await (const chunk of child.stdout) {
        stdout += chunk;
    }

    for await (const chunk of child.stderr) {
        stderr += chunk;
    }

    const exitCode = await new Promise<number>((resolve, reject) => {
        const handleWithExitCode = (code: number | null) => {
            if (code !== 0 || code == null) {
                if (stderr.includes('Failed to read justfile')) {
                    reject(new JustExecError(stderr, 'no-just-file', undefined, undefined, justExe, args));
                } else if (stderr.includes('No justfile found')) {
                    reject(new JustExecError(stderr, 'no-just-file', undefined, undefined, justExe, args));
                } else if (stderr.includes('Multiple candidate justfiles found')) {
                    reject(new JustExecError(stderr, 'multiple-candidate', undefined, undefined, justExe, args));
                } else if (stderr.includes('Justfile does not contain recipe')) {
                    reject(new JustExecError(stderr, 'no-recipes', undefined, undefined, justExe, args));
                } else if (stderr.includes('error: Expected ')) {
                    reject(new JustExecError(stderr, 'just-parse-error', undefined, undefined, justExe, args));
                } else if (stderr.includes('error: Justfile does not contain recipe ')) {
                    reject(new JustExecError(stderr, 'no-recipe', undefined, undefined, justExe, args));
                } else if (stderr.includes('error: Formatted justfile differs from original.')) {
                    reject(new JustExecError(stderr, 'unformatted', undefined, undefined, justExe, args));
                }
                reject(new JustExecError(stderr, 'unknown', undefined, undefined, justExe, args));
                return;
            }

            resolve(code);
        };

        child.on('error', (e) => {
            reject(e);
        });
        child.on('close', (code) => {
            handleWithExitCode(code);
        });
    });

    return new execResult(justExe, args, exitCode, stdout, stderr);
}

//  'no-just-file'  | 'just-parse-error' 
export type JustErrorKind = 'no-recipes' |
    'no-just-file' |
    'no-just' |
    'just-parse-error' |
    'multiple-candidate' |
    'no-recipe' |
    'unformatted' |
    'unknown';

export class JustExecError extends Error {

    constructor(message?: string,
        public kind?: JustErrorKind,
        public stdout?: string,
        public stderr?: string,
        public command?: string,
        public args?: readonly string[],
    ) {
        super(message);
    }
}
