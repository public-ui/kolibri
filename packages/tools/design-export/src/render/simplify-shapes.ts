import type { ShapeNode } from './dom-to-shapes.js';

/** Bounds differences up to this many pixels count as the same box (sub-pixel layout). */
const TOLERANCE = 1;

/**
 * A box carries design of its own when it paints its area, insets its content or arranges
 * several children. A corner radius alone paints nothing. Opacity, outline and minimum size
 * do not count: on a wrapper of the same size they transfer to the child unchanged. An
 * interactive element always stays: it carries the focus ring in focused states, so it keeps
 * its layer in every state and every variant of a component has the same layers.
 */
function carriesDesign(node: ShapeNode): boolean {
	return (
		node.interactive === true ||
		node.fill !== undefined ||
		node.stroke !== undefined ||
		node.shadow !== undefined ||
		node.padding !== undefined ||
		(node.layout !== undefined && node.children.length > 1)
	);
}

const transfersToChild = (node: ShapeNode): boolean => node.outline !== undefined || node.opacity !== undefined;

/** Opacity multiplies, the outline keeps its own corner radius, the larger minimum size wins. */
function transferred(outer: ShapeNode, inner: ShapeNode): Partial<ShapeNode> {
	const opacity = (outer.opacity ?? 1) * (inner.opacity ?? 1);
	const max = (a?: number, b?: number) => (a === undefined ? b : b === undefined ? a : Math.max(a, b));
	const outline = inner.outline ?? (outer.outline ? { ...outer.outline, radius: outer.outline.radius ?? outer.radius } : undefined);
	return {
		minHeight: max(outer.minHeight, inner.minHeight),
		minWidth: max(outer.minWidth, inner.minWidth),
		opacity: opacity < 1 ? opacity : undefined,
		outline,
	};
}

function sameBounds(outer: ShapeNode, inner: ShapeNode): boolean {
	return (
		Math.abs(outer.x - inner.x) <= TOLERANCE &&
		Math.abs(outer.y - inner.y) <= TOLERANCE &&
		Math.abs(outer.width - inner.width) <= TOLERANCE &&
		Math.abs(outer.height - inner.height) <= TOLERANCE
	);
}

/**
 * The layer name of a folded pair: the component's own block wins, then the inner
 * name, except for a text whose name the walker synthesized from its wrapper.
 */
function foldedName(outer: ShapeNode, inner: ShapeNode, block: string): string {
	if (inner.kind === 'text' && inner.name === `${outer.name}__text`) {
		return outer.name;
	}
	const ownBlock = (name: string) => name === block || name.startsWith(`${block}__`);
	if (ownBlock(outer.name) && !ownBlock(inner.name)) {
		return outer.name;
	}
	return inner.name;
}

/**
 * Folds every wrapper that carries no design of its own and has exactly one child of the
 * same size (or one text) into that child, and drops empty wrappers. The result keeps one
 * layer per visible box, so fill, border, radius and padding sit on the layer that
 * represents the element in the design tool, and every state of a component has the same
 * layer structure. The classes of folded wrappers stay on the layer, so the
 * theming contract remains traceable.
 */
export function simplifyShapes(node: ShapeNode, block = node.name): ShapeNode | undefined {
	if (node.kind === 'text') {
		return node;
	}
	const children = node.children.map((child) => simplifyShapes(child, block)).filter((child): child is ShapeNode => child !== undefined);
	const simplified: ShapeNode = { ...node, children };
	if (carriesDesign(simplified)) {
		return simplified;
	}
	if (children.length === 0) {
		return undefined;
	}
	const [child] = children;
	const foldable = child.kind === 'box' ? sameBounds(simplified, child) : !transfersToChild(simplified);
	if (children.length === 1 && foldable) {
		return {
			...child,
			...(child.kind === 'box' ? transferred(simplified, child) : {}),
			name: foldedName(simplified, child, block),
			classes: [...new Set([...simplified.classes, ...child.classes])],
			inline: simplified.inline ?? child.inline,
		};
	}
	return simplified;
}
