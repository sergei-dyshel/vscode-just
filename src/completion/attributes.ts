

// https://just.systems/man/en/chapter_34.html

interface AttributeData {
    name: string
    detail: string
    insertText?: string
}

export const attributes: AttributeData[] = [
    {
        name: "confirm",
        detail: "Require confirmation prior to executing recipe."
    },
    {
        name: "confirmp",
        detail: "Require confirmation prior to executing recipe with a custom prompt.",
        insertText: "confirm('${1:PROMPT}')"
    },
    {
        name: "doc",
        detail: "Set recipe’s documentation comment to DOC.",
        insertText: "doc('${1:DOC}')"
    },
    {
        name: "group",
        detail: "Put recipe in recipe group NAME.",
        insertText: "group('${1:NAME}')"
    },
    {
        name: "linux",
        detail: "Enable recipe on Linux."
    },
    {
        name: "macos",
        detail: "Enable recipe on MacOS."
    },
    {
        name: "no-cd",
        detail: "Don’t change directory before executing recipe."
    },
    {
        name: "no-exit-message",
        detail: "Don’t print an error message if recipe fails."
    },
    {
        name: "no-quiet",
        detail: "Override globally quiet recipes and always echo out the recipe."
    },
    {
        name: "positional-arguments",
        detail: "Turn on positional arguments for this recipe."
    },
    {
        name: "private",
        detail: "Omitted from just --list."
    },
    {
        name: "unix",
        detail: "Enable recipe on Unixes. (Includes MacOS)."
    },
    {
        name: "windows",
        detail: "Enable recipe on Windows."
    },
];