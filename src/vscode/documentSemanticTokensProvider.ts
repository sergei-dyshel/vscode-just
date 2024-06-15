import {
	CancellationToken,
	DocumentSemanticTokensProvider,
	OutputChannel,
	Range,
	SemanticTokens,
	SemanticTokensBuilder,
	SemanticTokensLegend,
	TextDocument,
} from 'vscode';
import { listComments, parseJustfile } from '../grammar';
import { rangeFromRuleContext, rangeFromTerminalNode } from './misc';
import { ParseTree, ParserRuleContext, TerminalNode } from 'antlr4';
import { ValueContext } from '../grammar/JustfileParser';
import JustfileLexer from '../grammar/JustfileLexer';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

export const justfileLegend = (function () {
	const tokenTypesLegend = [
		'comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
		'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
		'method', 'decorator', 'macro', 'variable', 'parameter', 'property', 'label'
	];
	tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

	const tokenModifiersLegend = [
		'declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
		'modification', 'async'
	];
	tokenModifiersLegend.forEach((tokenModifier, index) => tokenModifiers.set(tokenModifier, index));

	return new SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();

export class JustDocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {
	constructor(private outputChannel: OutputChannel) { }

	async provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): Promise<SemanticTokens> {
		const ctx = parseJustfile(document.getText());

		const builder = new DocumentedSemanticTokensBuilder(document, justfileLegend);
		ctx.item_list().forEach((item) => {
			this._pushSemanticStringTokensDFS(builder, item);

			const settings = item.settingStatement();
			if (settings) {
				listComments(settings).forEach((comment) => {
					this._pushSemanticTerminalNodeToken(builder, comment, "comment");
				});

				const settingName = settings.stringSettingNames() || settings.stringSeqSettingNames() || settings.booleanSettingNames();
				this._pushSemanticToken(builder, settingName, "property", ['modification'],);
				return;
			}

			const assignment = item.assignment();
			if (assignment) {
				const variableName = assignment.variableName();
				this._pushSemanticToken(builder, variableName, "variable", ["declaration"],);
				return;
			}

			const _export = item.exportStatement();
			if (_export) {
				listComments(_export).forEach((comment) => {
					this._pushSemanticTerminalNodeToken(builder, comment, "comment");
				});
				const assignment = _export.assignment();
				if (assignment) {
					const variableName = assignment.variableName();
					this._pushSemanticToken(builder, variableName, "variable", ["declaration"],);
					this._pushSemanticTerminalNodeToken(builder, assignment.Assign(), "operator");
				}
				return;
			}

			const alias = item.aliasStatement();
			if (alias) {
				listComments(alias).forEach((comment) => {
					this._pushSemanticTerminalNodeToken(builder, comment, "comment");
				});
				const recipeName = alias.recipeName();
				const originRecipeName = alias.originRecipeName();

				this._pushSemanticToken(builder, recipeName, "method", ["declaration"]);
				this._pushSemanticToken(builder, originRecipeName, "method", []);
				return;
			}

			const recipe = item.recipe();
			if (recipe) {
				listComments(recipe).forEach((comment) => {
					this._pushSemanticTerminalNodeToken(builder, comment, "comment");
				});
				const recipeName = recipe.recipeName();
				this._pushSemanticToken(builder, recipeName, "method", ["declaration"]);

				recipe.dependency_list().forEach((dependency) => {
					this._pushSemanticToken(builder, dependency.recipeName(), "method", []);
				});
			}

			const eol = item.eol();
			if (eol) {
				const comment = eol.COMMENT();
				this._pushSemanticTerminalNodeToken(builder, comment, "comment");
			}
		});

		return builder.build();
	}

	private _pushSemanticStringTokensDFS(builder: DocumentedSemanticTokensBuilder, pt: ParseTree) {
		if (!pt) {
			return;
		}
		if (pt instanceof ParserRuleContext) {
			const className = pt.constructor.name;

			switch (className) {
				case "BooleanSettingNamesContext":
				case "StringSettingNamesContext":
				case "StringSeqSettingNamesContext":
					this._pushSemanticToken(builder, pt, "macro");
					return;
				case "FunctionLeftContext":
				case "FunctionRightContext":
					this._pushSemanticToken(builder, pt, "function");
					return;
				case "StringContext":
					this._pushSemanticToken(builder, pt, "string");
					return;
				case "ParameterNameContext":
					this._pushSemanticToken(builder, pt, "parameter");
					return;
				case "AttributeContext":
					this._pushSemanticToken(builder, pt, "decorator");
					return;
				default:
					break;
			}

			if (pt instanceof ValueContext) {
				const name = pt.NAME();
				if (name) {
					this._pushSemanticTerminalNodeToken(builder, pt.NAME(), "variable");
					return;
				}
			}

			pt.children?.forEach((child) => {
				this._pushSemanticStringTokensDFS(builder, child);
			});
		} else if (pt instanceof TerminalNode) {
			switch (pt.symbol.type) {
				case JustfileLexer.INDENTED_RAW_STRING:
				case JustfileLexer.INDENTED_STRING:
				case JustfileLexer.RAW_STRING:
				case JustfileLexer.STRING:
					this._pushSemanticTerminalNodeToken(builder, pt, "string");
					break;
				case JustfileLexer.Set:
				case JustfileLexer.Alias:
				case JustfileLexer.Import:
				case JustfileLexer.Export:
				case JustfileLexer.If:
				case JustfileLexer.Else:
					this._pushSemanticTerminalNodeToken(builder, pt, "keyword");
					break;

				case JustfileLexer.Assign:
				case JustfileLexer.EqualsEquals:
				case JustfileLexer.EqualsTilde:
				case JustfileLexer.NotEquals:
				case JustfileLexer.Plus:
				case JustfileLexer.Star:
				case JustfileLexer.Equal:
					this._pushSemanticTerminalNodeToken(builder, pt, "operator");
					break;
				default:
					if (pt.symbol.type >= JustfileLexer.Assign && pt.symbol.type <= JustfileLexer.Question) {
						this._pushSemanticTerminalNodeToken(builder, pt, "operator");
					}
					break;
			}
		} else {
			console.log(pt.getText());
		}
	}

	private _pushSemanticTerminalNodeToken(
		builder: DocumentedSemanticTokensBuilder,
		node: TerminalNode,
		tokenType: string,
	) {
		if (!node) {
			return;
		}

		try {
			const range = rangeFromTerminalNode(node);
			builder.pushRange(
				range,
				tokenType,
			);
		} catch (error) {
			this.outputChannel.appendLine(error.toString());
		}
	}

	private _pushSemanticToken(
		builder: DocumentedSemanticTokensBuilder,
		ctx: ParserRuleContext,
		tokenType: string,
		tokenModifiers?: readonly string[]
	) {
		if (!ctx) {
			return;
		}

		const range = rangeFromRuleContext(ctx);
		try {
			builder.pushRange(
				range,
				tokenType,
				tokenModifiers,
			);

		} catch (error) {
			this.outputChannel.appendLine(error.toString());
		}
	}
}

class DocumentedSemanticTokensBuilder extends SemanticTokensBuilder {
	constructor(private doc: TextDocument, legend?: SemanticTokensLegend) {
		super(legend);
	}

	/**
	 * Add another token. Use only when providing a legend.
	 *
	 * @param range The range of the token. Must be single-line.
	 * @param tokenType The token type.
	 * @param tokenModifiers The token modifiers.
	 */
	pushRange(range: Range, tokenType: string, tokenModifiers?: readonly string[]): void {
		if (range.start.line === range.end.line) {
			super.push(range, tokenType, tokenModifiers);
			return;
		}

		const maxLineLength = 9999;

		const tt = this._encodeTokenType(tokenType);
		const tm = this._encodeTokenModifiers(tokenModifiers);

		super.push(
			range.start.line,
			range.start.character,
			maxLineLength,
			tt,
			tm,
		);

		for (let line = range.start.line + 1; line < range.end.line; line++) {
			super.push(
				line,
				0,
				maxLineLength,
				tt,
				tm,
			);
		}

		super.push(
			range.end.line,
			0,
			range.end.character + 1,
			tt,
			tm,
		);

	}

	private _encodeTokenType(tokenType: string): number {
		if (tokenTypes.has(tokenType)) {
			return tokenTypes.get(tokenType)!;
		} else if (tokenType === 'notInLegend') {
			return tokenTypes.size + 2;
		}
		return 0;
	}

	private _encodeTokenModifiers(strTokenModifiers?: readonly string[]): number | undefined {
		if (!strTokenModifiers) {
			return undefined;
		}
		let result = 0;
		for (let i = 0; i < strTokenModifiers.length; i++) {
			const tokenModifier = strTokenModifiers[i];
			if (tokenModifiers.has(tokenModifier)) {
				result = result | (1 << tokenModifiers.get(tokenModifier)!);
			} else if (tokenModifier === 'notInLegend') {
				result = result | (1 << tokenModifiers.size + 2);
			}
		}
		return result;
	}
}