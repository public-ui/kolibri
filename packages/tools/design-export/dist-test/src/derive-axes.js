import ts from 'typescript';
/** The value of the `Variant` axis that leaves `_variant` unset. */
export const UNSET_VARIANT = 'none';
const VARIANT_MODIFIER = /^variant-(.+)$/;
/**
 * Reads the type of `_variant` per component tag from the Stencil component declarations
 * (`components.d.ts`) through the TypeScript checker: a union of string literals is closed,
 * anything else (e.g. `string | string[]` for a class name) is open.
 */
export function readVariantTypes(componentsDts) {
	const program = ts.createProgram([componentsDts], { noEmit: true, skipLibCheck: true, strict: true });
	const checker = program.getTypeChecker();
	const source = program.getSourceFile(componentsDts);
	if (!source) {
		throw new Error(`Cannot read ${componentsDts}.`);
	}
	const result = {};
	const visit = (node) => {
		if (ts.isModuleDeclaration(node) && node.name.getText(source) === 'Components' && node.body && ts.isModuleBlock(node.body)) {
			for (const statement of node.body.statements) {
				if (!ts.isInterfaceDeclaration(statement)) continue;
				const member = statement.members.find(
					(candidate) => ts.isPropertySignature(candidate) && candidate.name.getText(source).replace(/"/g, '') === '_variant',
				);
				if (!member || !ts.isPropertySignature(member) || !member.type) continue;
				result[tagOf(statement.name.text)] = variantTypeOf(checker.getTypeFromTypeNode(member.type));
			}
			return;
		}
		ts.forEachChild(node, visit);
	};
	visit(source);
	return result;
}
function variantTypeOf(type) {
	const members = type.isUnion() ? type.types : [type];
	const literals = members.filter((member) => !(member.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
	if (literals.length > 0 && literals.every((member) => member.isStringLiteral())) {
		return { kind: 'closed', values: literals.map((member) => member.value).sort() };
	}
	return { kind: 'open' };
}
/** `KolInputCheckbox` → `kol-input-checkbox`. */
function tagOf(interfaceName) {
	return interfaceName.replace(/[A-Z]/g, (letter, index) => `${index === 0 ? '' : '-'}${letter.toLowerCase()}`);
}
/** Block modifiers the theme styles in its component CSS (`.kol-button--primary`), without element modifiers. */
export function cssModifiers(block, css) {
	if (!css) return [];
	const escaped = block.replace(/[-]/g, '\\-');
	const modifiers = [...css.matchAll(new RegExp(`\\.${escaped}--([a-z][a-z0-9-]*)(?![\\w-])`, 'g'))].map((match) => match[1]);
	return [...new Set(modifiers)].sort();
}
/**
 * Derives the style axes of a component from its implementation, the BEM registry and the theme CSS:
 *
 * 1. A closed string-literal type of `_variant` names its values: the implementation decides.
 * 2. Otherwise `variant-<value>` modifiers (registry or theme CSS) name them.
 * 3. Otherwise `_variant` is a class name: the values are the block modifiers the theme styles,
 *    minus the state modifiers of the registry and minus modifiers of other props (`type-…`);
 *    `none` (the prop unset) is added, the renderer drops it when it looks like one of the values.
 */
export function deriveAxes(api, bem, css, variantType) {
	const disabled = api.attributes.includes('_disabled');
	if (!api.attributes.includes('_variant')) {
		return { disabled };
	}
	if (variantType?.kind === 'closed') {
		return { disabled, variants: variantType.values, variantSource: 'prop-type' };
	}
	const block = api.tag;
	const modifiers = [...new Set([...(bem?.modifiers ?? []), ...cssModifiers(block, css)])].sort();
	const prefixed = modifiers.map((modifier) => VARIANT_MODIFIER.exec(modifier)?.[1]).filter((value) => value !== undefined);
	if (prefixed.length > 0) {
		return { disabled, variants: prefixed, variantSource: 'css-modifier' };
	}
	const registry = new Set(bem?.modifiers ?? []);
	const ofOtherProps = (modifier) => modifier.includes('-') && api.attributes.includes(`_${modifier.slice(0, modifier.indexOf('-'))}`);
	const themed = cssModifiers(block, css).filter((modifier) => !registry.has(modifier) && !ofOtherProps(modifier));
	if (themed.length === 0) {
		return { disabled };
	}
	return { disabled, variants: [UNSET_VARIANT, ...themed], variantSource: 'theme-modifier' };
}
