// Generated from JustfileParser.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { JustfileContext } from "./JustfileParser";
import { ItemContext } from "./JustfileParser";
import { EolContext } from "./JustfileParser";
import { PostCommentContext } from "./JustfileParser";
import { ItemDocumentationContext } from "./JustfileParser";
import { ImportStatementContext } from "./JustfileParser";
import { AliasStatementContext } from "./JustfileParser";
import { OriginRecipeNameContext } from "./JustfileParser";
import { SetKeywordContext } from "./JustfileParser";
import { AliasKeywordContext } from "./JustfileParser";
import { ImportKeywordContext } from "./JustfileParser";
import { ExportKeywordContext } from "./JustfileParser";
import { ModKeywordContext } from "./JustfileParser";
import { AssignmentContext } from "./JustfileParser";
import { VariableNameContext } from "./JustfileParser";
import { ExportStatementContext } from "./JustfileParser";
import { SettingStatementContext } from "./JustfileParser";
import { BooleanSettingNamesContext } from "./JustfileParser";
import { StringSettingNamesContext } from "./JustfileParser";
import { StringSeqSettingNamesContext } from "./JustfileParser";
import { ModuleStatementContext } from "./JustfileParser";
import { BooleanContext } from "./JustfileParser";
import { BooleanValuesContext } from "./JustfileParser";
import { StringSliceContext } from "./JustfileParser";
import { ExpressionContext } from "./JustfileParser";
import { ConditionContext } from "./JustfileParser";
import { ConditionBlockContext } from "./JustfileParser";
import { FunctionLeftContext } from "./JustfileParser";
import { FunctionRightContext } from "./JustfileParser";
import { FunctionValueContext } from "./JustfileParser";
import { ValueContext } from "./JustfileParser";
import { SequenceContext } from "./JustfileParser";
import { RecipeContext } from "./JustfileParser";
import { RecipeNameContext } from "./JustfileParser";
import { AttributesContext } from "./JustfileParser";
import { AttributeContext } from "./JustfileParser";
import { ParameterNameContext } from "./JustfileParser";
import { ParameterContext } from "./JustfileParser";
import { VariadicModifierContext } from "./JustfileParser";
import { VariadicContext } from "./JustfileParser";
import { DependencyContext } from "./JustfileParser";
import { BodyContext } from "./JustfileParser";
import { RawBlocksContext } from "./JustfileParser";
import { CommandBlocksContext } from "./JustfileParser";
import { InterpolationContext } from "./JustfileParser";
import { StringValueContext } from "./JustfileParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `JustfileParser`.
 */
export default class JustfileParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `JustfileParser.justfile`.
	 * @param ctx the parse tree
	 */
	enterJustfile?: (ctx: JustfileContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.justfile`.
	 * @param ctx the parse tree
	 */
	exitJustfile?: (ctx: JustfileContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.eol`.
	 * @param ctx the parse tree
	 */
	enterEol?: (ctx: EolContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.eol`.
	 * @param ctx the parse tree
	 */
	exitEol?: (ctx: EolContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.postComment`.
	 * @param ctx the parse tree
	 */
	enterPostComment?: (ctx: PostCommentContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.postComment`.
	 * @param ctx the parse tree
	 */
	exitPostComment?: (ctx: PostCommentContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.itemDocumentation`.
	 * @param ctx the parse tree
	 */
	enterItemDocumentation?: (ctx: ItemDocumentationContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.itemDocumentation`.
	 * @param ctx the parse tree
	 */
	exitItemDocumentation?: (ctx: ItemDocumentationContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.importStatement`.
	 * @param ctx the parse tree
	 */
	enterImportStatement?: (ctx: ImportStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.importStatement`.
	 * @param ctx the parse tree
	 */
	exitImportStatement?: (ctx: ImportStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.aliasStatement`.
	 * @param ctx the parse tree
	 */
	enterAliasStatement?: (ctx: AliasStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.aliasStatement`.
	 * @param ctx the parse tree
	 */
	exitAliasStatement?: (ctx: AliasStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.originRecipeName`.
	 * @param ctx the parse tree
	 */
	enterOriginRecipeName?: (ctx: OriginRecipeNameContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.originRecipeName`.
	 * @param ctx the parse tree
	 */
	exitOriginRecipeName?: (ctx: OriginRecipeNameContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.setKeyword`.
	 * @param ctx the parse tree
	 */
	enterSetKeyword?: (ctx: SetKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.setKeyword`.
	 * @param ctx the parse tree
	 */
	exitSetKeyword?: (ctx: SetKeywordContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.aliasKeyword`.
	 * @param ctx the parse tree
	 */
	enterAliasKeyword?: (ctx: AliasKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.aliasKeyword`.
	 * @param ctx the parse tree
	 */
	exitAliasKeyword?: (ctx: AliasKeywordContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.importKeyword`.
	 * @param ctx the parse tree
	 */
	enterImportKeyword?: (ctx: ImportKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.importKeyword`.
	 * @param ctx the parse tree
	 */
	exitImportKeyword?: (ctx: ImportKeywordContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.exportKeyword`.
	 * @param ctx the parse tree
	 */
	enterExportKeyword?: (ctx: ExportKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.exportKeyword`.
	 * @param ctx the parse tree
	 */
	exitExportKeyword?: (ctx: ExportKeywordContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.modKeyword`.
	 * @param ctx the parse tree
	 */
	enterModKeyword?: (ctx: ModKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.modKeyword`.
	 * @param ctx the parse tree
	 */
	exitModKeyword?: (ctx: ModKeywordContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.variableName`.
	 * @param ctx the parse tree
	 */
	enterVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.variableName`.
	 * @param ctx the parse tree
	 */
	exitVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.exportStatement`.
	 * @param ctx the parse tree
	 */
	enterExportStatement?: (ctx: ExportStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.exportStatement`.
	 * @param ctx the parse tree
	 */
	exitExportStatement?: (ctx: ExportStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.settingStatement`.
	 * @param ctx the parse tree
	 */
	enterSettingStatement?: (ctx: SettingStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.settingStatement`.
	 * @param ctx the parse tree
	 */
	exitSettingStatement?: (ctx: SettingStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.booleanSettingNames`.
	 * @param ctx the parse tree
	 */
	enterBooleanSettingNames?: (ctx: BooleanSettingNamesContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.booleanSettingNames`.
	 * @param ctx the parse tree
	 */
	exitBooleanSettingNames?: (ctx: BooleanSettingNamesContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.stringSettingNames`.
	 * @param ctx the parse tree
	 */
	enterStringSettingNames?: (ctx: StringSettingNamesContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.stringSettingNames`.
	 * @param ctx the parse tree
	 */
	exitStringSettingNames?: (ctx: StringSettingNamesContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.stringSeqSettingNames`.
	 * @param ctx the parse tree
	 */
	enterStringSeqSettingNames?: (ctx: StringSeqSettingNamesContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.stringSeqSettingNames`.
	 * @param ctx the parse tree
	 */
	exitStringSeqSettingNames?: (ctx: StringSeqSettingNamesContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.moduleStatement`.
	 * @param ctx the parse tree
	 */
	enterModuleStatement?: (ctx: ModuleStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.moduleStatement`.
	 * @param ctx the parse tree
	 */
	exitModuleStatement?: (ctx: ModuleStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.boolean`.
	 * @param ctx the parse tree
	 */
	enterBoolean?: (ctx: BooleanContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.boolean`.
	 * @param ctx the parse tree
	 */
	exitBoolean?: (ctx: BooleanContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.booleanValues`.
	 * @param ctx the parse tree
	 */
	enterBooleanValues?: (ctx: BooleanValuesContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.booleanValues`.
	 * @param ctx the parse tree
	 */
	exitBooleanValues?: (ctx: BooleanValuesContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.stringSlice`.
	 * @param ctx the parse tree
	 */
	enterStringSlice?: (ctx: StringSliceContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.stringSlice`.
	 * @param ctx the parse tree
	 */
	exitStringSlice?: (ctx: StringSliceContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.conditionBlock`.
	 * @param ctx the parse tree
	 */
	enterConditionBlock?: (ctx: ConditionBlockContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.conditionBlock`.
	 * @param ctx the parse tree
	 */
	exitConditionBlock?: (ctx: ConditionBlockContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.functionLeft`.
	 * @param ctx the parse tree
	 */
	enterFunctionLeft?: (ctx: FunctionLeftContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.functionLeft`.
	 * @param ctx the parse tree
	 */
	exitFunctionLeft?: (ctx: FunctionLeftContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.functionRight`.
	 * @param ctx the parse tree
	 */
	enterFunctionRight?: (ctx: FunctionRightContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.functionRight`.
	 * @param ctx the parse tree
	 */
	exitFunctionRight?: (ctx: FunctionRightContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.functionValue`.
	 * @param ctx the parse tree
	 */
	enterFunctionValue?: (ctx: FunctionValueContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.functionValue`.
	 * @param ctx the parse tree
	 */
	exitFunctionValue?: (ctx: FunctionValueContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.sequence`.
	 * @param ctx the parse tree
	 */
	enterSequence?: (ctx: SequenceContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.sequence`.
	 * @param ctx the parse tree
	 */
	exitSequence?: (ctx: SequenceContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.recipe`.
	 * @param ctx the parse tree
	 */
	enterRecipe?: (ctx: RecipeContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.recipe`.
	 * @param ctx the parse tree
	 */
	exitRecipe?: (ctx: RecipeContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.recipeName`.
	 * @param ctx the parse tree
	 */
	enterRecipeName?: (ctx: RecipeNameContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.recipeName`.
	 * @param ctx the parse tree
	 */
	exitRecipeName?: (ctx: RecipeNameContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.attributes`.
	 * @param ctx the parse tree
	 */
	enterAttributes?: (ctx: AttributesContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.attributes`.
	 * @param ctx the parse tree
	 */
	exitAttributes?: (ctx: AttributesContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.attribute`.
	 * @param ctx the parse tree
	 */
	enterAttribute?: (ctx: AttributeContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.attribute`.
	 * @param ctx the parse tree
	 */
	exitAttribute?: (ctx: AttributeContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.parameterName`.
	 * @param ctx the parse tree
	 */
	enterParameterName?: (ctx: ParameterNameContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.parameterName`.
	 * @param ctx the parse tree
	 */
	exitParameterName?: (ctx: ParameterNameContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.variadicModifier`.
	 * @param ctx the parse tree
	 */
	enterVariadicModifier?: (ctx: VariadicModifierContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.variadicModifier`.
	 * @param ctx the parse tree
	 */
	exitVariadicModifier?: (ctx: VariadicModifierContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.variadic`.
	 * @param ctx the parse tree
	 */
	enterVariadic?: (ctx: VariadicContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.variadic`.
	 * @param ctx the parse tree
	 */
	exitVariadic?: (ctx: VariadicContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.dependency`.
	 * @param ctx the parse tree
	 */
	enterDependency?: (ctx: DependencyContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.dependency`.
	 * @param ctx the parse tree
	 */
	exitDependency?: (ctx: DependencyContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.body`.
	 * @param ctx the parse tree
	 */
	enterBody?: (ctx: BodyContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.body`.
	 * @param ctx the parse tree
	 */
	exitBody?: (ctx: BodyContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.rawBlocks`.
	 * @param ctx the parse tree
	 */
	enterRawBlocks?: (ctx: RawBlocksContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.rawBlocks`.
	 * @param ctx the parse tree
	 */
	exitRawBlocks?: (ctx: RawBlocksContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.commandBlocks`.
	 * @param ctx the parse tree
	 */
	enterCommandBlocks?: (ctx: CommandBlocksContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.commandBlocks`.
	 * @param ctx the parse tree
	 */
	exitCommandBlocks?: (ctx: CommandBlocksContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.interpolation`.
	 * @param ctx the parse tree
	 */
	enterInterpolation?: (ctx: InterpolationContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.interpolation`.
	 * @param ctx the parse tree
	 */
	exitInterpolation?: (ctx: InterpolationContext) => void;
	/**
	 * Enter a parse tree produced by `JustfileParser.stringValue`.
	 * @param ctx the parse tree
	 */
	enterStringValue?: (ctx: StringValueContext) => void;
	/**
	 * Exit a parse tree produced by `JustfileParser.stringValue`.
	 * @param ctx the parse tree
	 */
	exitStringValue?: (ctx: StringValueContext) => void;
}

