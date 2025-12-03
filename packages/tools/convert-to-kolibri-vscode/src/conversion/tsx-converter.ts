import generate from '@babel/generator';
import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { ConversionCandidate, ConversionOutput, ScanSummary } from './types';

function getName(node: t.JSXIdentifier | t.JSXNamespacedName | t.JSXMemberExpression): string | undefined {
	if (t.isJSXIdentifier(node)) {
		return node.name;
	}

	return undefined;
}

function stringLiteral(value: string): t.JSXExpressionContainer {
	return t.jsxExpressionContainer(t.stringLiteral(value));
}

function booleanLiteral(value: boolean): t.JSXExpressionContainer {
	return t.jsxExpressionContainer(t.booleanLiteral(value));
}

function normalizeText(children: t.JSXElement['children']): string | undefined {
	const textNodes = children.filter((child) => t.isJSXText(child));
	const label = textNodes
		.map((node) => node.value)
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();

	return label || undefined;
}

function extractClassName(attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>): string | undefined {
	const attribute = attributes.find((item): item is t.JSXAttribute => t.isJSXAttribute(item) && t.isJSXIdentifier(item.name) && item.name.name === 'className');

	if (!attribute || !attribute.value) {
		return undefined;
	}

	if (t.isStringLiteral(attribute.value)) {
		return attribute.value.value;
	}

	return undefined;
}

function mapVariantFromClassName(classes?: string): string | undefined {
	if (!classes) {
		return undefined;
	}

	const variants = ['primary', 'secondary', 'success', 'danger', 'warning'];
	const classList = classes.split(/\s+/);
	return classList.find((item) => variants.includes(item));
}

function extractIconFromChildren(children: t.JSXElement['children']): string | undefined {
	const iconElement = children.find(
		(child): child is t.JSXElement => t.isJSXElement(child) && t.isJSXIdentifier(child.openingElement.name) && child.openingElement.name.name === 'i',
	);

	if (!iconElement) {
		return undefined;
	}

	const className = extractClassName(iconElement.openingElement.attributes);
	if (!className) {
		return undefined;
	}

	const classes = className.split(/\s+/);
	return classes.find((item) => item.startsWith('fa-'));
}

function extractEventHandlers(attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>): {
	eventAttribute: t.JSXAttribute | null;
	remaining: Array<t.JSXAttribute | t.JSXSpreadAttribute>;
	warning?: string;
} {
	const properties: t.ObjectProperty[] = [];
	const remaining: Array<t.JSXAttribute | t.JSXSpreadAttribute> = [];
	let warning: string | undefined;

	for (const attribute of attributes) {
		if (!t.isJSXAttribute(attribute) || !t.isJSXIdentifier(attribute.name)) {
			remaining.push(attribute);
			continue;
		}

		if (!attribute.name.name.startsWith('on')) {
			remaining.push(attribute);
			continue;
		}

		if (!attribute.value || !t.isJSXExpressionContainer(attribute.value)) {
			warning = 'Event handler without expression could not be mapped';
			continue;
		}

		properties.push(t.objectProperty(t.identifier(attribute.name.name), attribute.value.expression as t.Expression));
	}

	if (!properties.length) {
		return { eventAttribute: null, remaining, warning };
	}

	return {
		eventAttribute: t.jsxAttribute(t.jsxIdentifier('_on'), t.jsxExpressionContainer(t.objectExpression(properties))),
		remaining,
		warning,
	};
}

function convertButton(path: NodePath<t.JSXElement>, candidates: ConversionCandidate[]): void {
	const original = generate(path.node).code;
	const attributes = path.node.openingElement.attributes;
	const label = normalizeText(path.node.children);
	const className = extractClassName(attributes);
	const variant = mapVariantFromClassName(className);
	const icon = extractIconFromChildren(path.node.children);
	const disabled = attributes.some((attribute) => t.isJSXAttribute(attribute) && t.isJSXIdentifier(attribute.name) && attribute.name.name === 'disabled');
	const { eventAttribute, remaining, warning } = extractEventHandlers(attributes);

	path.node.openingElement.name = t.jsxIdentifier('KolButton');
	if (path.node.closingElement) {
		path.node.closingElement.name = t.jsxIdentifier('KolButton');
	}

	path.node.children = [];
	const newAttributes: Array<t.JSXAttribute | t.JSXSpreadAttribute> = [];

	if (label) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_label'), stringLiteral(label)));
	}
	if (variant) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_variant'), stringLiteral(variant)));
	}
	if (icon) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_icon'), stringLiteral(icon)));
	}
	if (disabled) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_disabled'), booleanLiteral(true)));
	}
	if (eventAttribute) {
		newAttributes.push(eventAttribute);
	}

	for (const attribute of remaining) {
		if (t.isJSXAttribute(attribute) && t.isJSXIdentifier(attribute.name) && attribute.name.name === 'className') {
			continue;
		}

		newAttributes.push(attribute);
	}

	path.node.openingElement.attributes = newAttributes;

	const replacement = generate(path.node).code;
	const warnings = [];

	if (!label) {
		warnings.push('Button label was inferred from children; please verify the _label prop');
	}
	if (!variant && className) {
		warnings.push('Button class could not be mapped to a variant');
	}
	if (warning) {
		warnings.push(warning);
	}

	candidates.push({
		kind: 'button',
		confidence: warnings.length ? 'medium' : 'high',
		original,
		replacement,
		reason: 'Converted JSX button into KolButton with mapped props',
		warnings: warnings.length ? warnings : undefined,
	});
}

function convertInput(path: NodePath<t.JSXElement>, candidates: ConversionCandidate[]): void {
	const original = generate(path.node).code;
	const attributes = path.node.openingElement.attributes;
	const className = extractClassName(attributes);
	const typeAttribute = attributes.find((item): item is t.JSXAttribute => t.isJSXAttribute(item) && t.isJSXIdentifier(item.name) && item.name.name === 'type');
	const placeholderAttribute = attributes.find(
		(item): item is t.JSXAttribute =>
			t.isJSXAttribute(item) && t.isJSXIdentifier(item.name) && (item.name.name === 'placeholder' || item.name.name === 'aria-label'),
	);
	const requiredAttribute = attributes.find(
		(item): item is t.JSXAttribute => t.isJSXAttribute(item) && t.isJSXIdentifier(item.name) && item.name.name === 'required',
	);
	const typeValue = typeAttribute && typeAttribute.value && t.isStringLiteral(typeAttribute.value) ? typeAttribute.value.value : 'text';
	const label =
		placeholderAttribute && placeholderAttribute.value && t.isStringLiteral(placeholderAttribute.value)
			? placeholderAttribute.value.value
			: typeValue !== 'text'
				? `${typeValue} input`
				: undefined;
	const { eventAttribute, remaining, warning } = extractEventHandlers(attributes);

	path.node.openingElement.name = t.jsxIdentifier('KolInputText');
	path.node.closingElement = null;
	path.node.openingElement.selfClosing = true;
	path.node.children = [];

	const newAttributes: Array<t.JSXAttribute | t.JSXSpreadAttribute> = [];
	if (label) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_label'), stringLiteral(label)));
	}
	if (typeValue) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_type'), stringLiteral(typeValue)));
	}
	if (requiredAttribute) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_required'), booleanLiteral(true)));
	}
	if (placeholderAttribute && placeholderAttribute.value && t.isStringLiteral(placeholderAttribute.value)) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_hint'), stringLiteral(placeholderAttribute.value.value)));
	}
	if (eventAttribute) {
		newAttributes.push(eventAttribute);
	}

	for (const attribute of remaining) {
		if (t.isJSXAttribute(attribute) && t.isJSXIdentifier(attribute.name) && attribute.name.name === 'className') {
			continue;
		}
		if (attribute === typeAttribute || attribute === placeholderAttribute || attribute === requiredAttribute) {
			continue;
		}
		newAttributes.push(attribute);
	}

	path.node.openingElement.attributes = newAttributes;

	const replacement = generate(path.node).code;
	const warnings = [];

	if (!label) {
		warnings.push('Input had no label; placeholder was used to seed _label');
	}
	if (!className && !typeAttribute) {
		warnings.push('Input styling and type should be verified after conversion');
	}
	if (warning) {
		warnings.push(warning);
	}

	candidates.push({
		kind: 'input',
		confidence: warnings.length ? 'medium' : 'high',
		original,
		replacement,
		reason: 'Converted JSX input into KolInputText',
		warnings: warnings.length ? warnings : undefined,
	});
}

function convertLink(path: NodePath<t.JSXElement>, candidates: ConversionCandidate[]): void {
	const original = generate(path.node).code;
	const attributes = path.node.openingElement.attributes;
	const hrefAttribute = attributes.find((item): item is t.JSXAttribute => t.isJSXAttribute(item) && t.isJSXIdentifier(item.name) && item.name.name === 'href');
	const label = normalizeText(path.node.children);

	path.node.openingElement.name = t.jsxIdentifier('KolLink');
	if (path.node.closingElement) {
		path.node.closingElement.name = t.jsxIdentifier('KolLink');
	}
	path.node.children = [];

	const newAttributes: Array<t.JSXAttribute | t.JSXSpreadAttribute> = [];
	if (hrefAttribute && hrefAttribute.value && t.isStringLiteral(hrefAttribute.value)) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_href'), stringLiteral(hrefAttribute.value.value)));
	}
	if (label) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_label'), stringLiteral(label)));
	}

	path.node.openingElement.attributes = newAttributes;

	const replacement = generate(path.node).code;
	const warnings = [];

	if (!hrefAttribute) {
		warnings.push('Link without href converted to KolLink; please add _href');
	}
	if (!label) {
		warnings.push('Link text missing; _label seeded from children if possible');
	}

	candidates.push({
		kind: 'link',
		confidence: warnings.length ? 'medium' : 'high',
		original,
		replacement,
		reason: 'Converted anchor into KolLink',
		warnings: warnings.length ? warnings : undefined,
	});
}

function convertSelect(path: NodePath<t.JSXElement>, candidates: ConversionCandidate[]): void {
	const original = generate(path.node).code;
	const attributes = path.node.openingElement.attributes;
	const className = extractClassName(attributes);
	const variant = mapVariantFromClassName(className);

	path.node.openingElement.name = t.jsxIdentifier('KolSelect');
	if (path.node.closingElement) {
		path.node.closingElement.name = t.jsxIdentifier('KolSelect');
	}

	const newAttributes: Array<t.JSXAttribute | t.JSXSpreadAttribute> = [];
	if (variant) {
		newAttributes.push(t.jsxAttribute(t.jsxIdentifier('_variant'), stringLiteral(variant)));
	}

	for (const attribute of attributes) {
		if (t.isJSXAttribute(attribute) && t.isJSXIdentifier(attribute.name) && attribute.name.name === 'className') {
			continue;
		}
		newAttributes.push(attribute);
	}

	path.node.openingElement.attributes = newAttributes;

	const replacement = generate(path.node).code;
	const warnings = [];

	if (!variant && className) {
		warnings.push('Select class could not be mapped to a variant');
	}

	candidates.push({
		kind: 'select',
		confidence: warnings.length ? 'medium' : 'high',
		original,
		replacement,
		reason: 'Converted JSX select into KolSelect',
		warnings: warnings.length ? warnings : undefined,
	});
}

function convertElement(path: NodePath<t.JSXElement>, candidates: ConversionCandidate[]): void {
	const name = getName(path.node.openingElement.name);

	if (name === 'button' || name === 'Button') {
		convertButton(path, candidates);
		return;
	}

	if (name === 'input' || name === 'Input') {
		convertInput(path, candidates);
		return;
	}

	if (name === 'a') {
		convertLink(path, candidates);
		return;
	}

	if (name === 'select') {
		convertSelect(path, candidates);
	}
}

export function convertTsx(source: string): ConversionOutput {
	const ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
	const candidates: ConversionCandidate[] = [];

	traverse(ast, {
		JSXElement(path) {
			convertElement(path, candidates);
		},
	});

	const text = generate(ast, { retainLines: true }).code;
	return { text, candidates };
}

export function scanTsx(source: string): ScanSummary {
	const conversion = convertTsx(source);
	const counts = conversion.candidates.reduce<Record<string, number>>((accumulator, item) => {
		accumulator[item.kind] = (accumulator[item.kind] ?? 0) + 1;
		return accumulator;
	}, {});

	return { counts, candidates: conversion.candidates };
}
