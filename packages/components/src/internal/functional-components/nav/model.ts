import type { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps, LinkProps, LinkWithChildrenProps } from '../../../schema';

/** The children of an entry; an expanded entry is identified by the identity of its children array. */
export type NavChildren = ButtonOrLinkOrTextWithChildrenProps[];

/** An entry with a string `_href` renders as a link. */
export const isLinkEntry = (entry: ButtonOrLinkOrTextWithChildrenProps): entry is LinkWithChildrenProps => typeof (entry as LinkProps)._href === 'string';

/** An entry without `_href` but with an `_on.onClick` function is a button; any other entry renders as a button without action. */
export const isButtonEntry = (entry: ButtonOrLinkOrTextWithChildrenProps): entry is ButtonWithChildrenProps =>
	(entry as LinkProps)._href === undefined && typeof (entry as ButtonWithChildrenProps)._on?.onClick === 'function';

/**
 * The children arrays expanded on load: those of an active entry and those of every ancestor of an
 * active entry. Only the first active path per entry is followed; deeper arrays come first.
 */
export function getInitiallyExpanded(links: ButtonOrLinkOrTextWithChildrenProps[]): NavChildren[] {
	const expanded: NavChildren[] = [];
	const handleBranch = (branch: ButtonOrLinkOrTextWithChildrenProps): boolean => {
		if (branch._active) {
			if (branch._children) {
				expanded.push(branch._children);
			}
			return true;
		}
		if (branch._children) {
			for (const child of branch._children) {
				if (handleBranch(child)) {
					expanded.push(branch._children);
					return true;
				}
			}
		}
		return false;
	};
	links.forEach(handleBranch);
	return expanded;
}

/** Collapses expanded children and expands collapsed ones. */
export function toggleExpanded(expanded: NavChildren[], children: NavChildren): NavChildren[] {
	return expanded.includes(children) ? expanded.filter((item) => item !== children) : [...expanded, children];
}

/** The left icon of an entry: `_icons` as a string or its `left` icon. */
export function getLeftIcon(entry: ButtonOrLinkOrTextWithChildrenProps): string | undefined {
	if (typeof entry._icons === 'string') {
		return entry._icons;
	}
	return typeof entry._icons?.left === 'string' ? entry._icons.left : undefined;
}

/**
 * The icons of an entry. The left icon shows with `hasIconsWhenExpanded` or in the compact view, which
 * falls back to `kolicon-link`. A collapsible entry with children shows plus or minus on the right.
 */
export function buildEntryIcons({
	collapsible,
	expanded,
	hasIconsWhenExpanded,
	hideLabel,
	leftIcon,
}: {
	collapsible: boolean;
	expanded: boolean;
	hasIconsWhenExpanded: boolean;
	hideLabel: boolean;
	leftIcon?: string;
}): { left: string; right: string } {
	const icons = { left: '', right: '' };
	if (hasIconsWhenExpanded && leftIcon) {
		icons.left = leftIcon;
	}
	if (hideLabel) {
		icons.left = leftIcon || 'kolicon-link';
	}
	if (collapsible) {
		icons.right = expanded ? 'kolicon-minus' : 'kolicon-plus';
	}
	return icons;
}
