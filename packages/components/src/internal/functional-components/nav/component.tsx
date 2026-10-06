import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag, KolLinkWcTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import type { ButtonOrLinkOrTextWithChildrenProps, StencilUnknown, Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { NavApi } from './api';
import { buildEntryIcons, getLeftIcon, isButtonEntry, isLinkEntry } from './model';

export type NavFCProps = Omit<FunctionalComponentProps<NavApi>, 'hideLabel'> & {
	/** ID of the `nav` landmark; the compact button controls it. */
	navId: string;
	/** ID base of the nested lists. */
	listId: string;
};

type ListProps = Pick<NavFCProps, 'collapsible' | 'compact' | 'expandedChildren' | 'handleToggleExpansion' | 'hasIconsWhenExpanded'> & {
	deep: number;
	id: string;
	links: ButtonOrLinkOrTextWithChildrenProps[];
};

/**
 * One entry. Links stay `kol-link-wc` and buttons `kol-button-wc`, because the themes select
 * `.kol-nav__entry .kol-link`/`.kol-button` as ancestor relations.
 */
const renderEntry = (props: ListProps, entry: ButtonOrLinkOrTextWithChildrenProps, hasChildren: boolean, expanded: boolean, ariaId: string): JSX.Element => {
	const { collapsible, compact, handleToggleExpansion, hasIconsWhenExpanded } = props;
	const icons = buildEntryIcons({
		collapsible: collapsible && hasChildren,
		expanded,
		hasIconsWhenExpanded,
		hideLabel: compact,
		leftIcon: getLeftIcon(entry),
	});

	return (
		<div class="kol-nav__entry-wrapper">
			{isLinkEntry(entry) ? (
				<KolLinkWcTag
					class={clsx('kol-nav__entry kol-nav__entry--link', {
						'kol-nav__entry--collapsible': collapsible,
					})}
					{...entry}
					_hideLabel={compact}
					_icons={icons}
					_ariaControls={collapsible && hasChildren && expanded ? ariaId : undefined}
					_ariaExpanded={collapsible && hasChildren ? expanded : undefined}
				/>
			) : (
				<KolButtonWcTag
					class={clsx('kol-nav__entry kol-nav__entry--button', {
						'kol-nav__entry--collapsible': collapsible,
					})}
					_label={entry._label}
					_disabled={isButtonEntry(entry) ? entry._disabled : undefined}
					_hideLabel={compact}
					_icons={icons}
					_ariaControls={collapsible && hasChildren && expanded ? ariaId : undefined}
					_ariaExpanded={collapsible && hasChildren ? expanded : undefined}
					_on={{
						onClick: (event: MouseEvent, value: Stringified<StencilUnknown>) => {
							if (isButtonEntry(entry) && typeof entry._on.onClick === 'function') {
								entry._on.onClick(event, value);
							}
							handleToggleExpansion(entry._children);
						},
					}}
				/>
			)}
		</div>
	);
};

const NavListFC: FC<ListProps> = (props) => (
	<ul
		class={clsx('kol-nav__list', {
			'kol-nav__list--nested': props.deep > 0,
			'kol-nav__list--vertical': props.deep !== 0,
		})}
		id={props.deep > 0 ? props.id : undefined}
	>
		{props.links.map((link, index) => {
			const hasChildren = Array.isArray(link._children) && link._children.length > 0;
			const expanded = Boolean(link._children && props.expandedChildren.includes(link._children));
			const ariaId = createRelatedUniqueId(props.id, `${props.deep}-${index}`);
			return (
				<li
					class={clsx('kol-nav__list-item', {
						'kol-nav__list-item--active': !!link._active,
						'kol-nav__list-item--expanded': expanded,
						'kol-nav__list-item--has-children': hasChildren,
					})}
					key={index}
				>
					{renderEntry(props, link, hasChildren, expanded, ariaId)}
					{expanded && <NavListFC {...props} deep={props.deep + 1} links={link._children || []} id={ariaId} />}
				</li>
			);
		})}
	</ul>
);

/** The navigation with its nested lists and the optional compact button. */
export const NavFC: FC<NavFCProps> = ({
	collapsible,
	compact,
	expandedChildren,
	handleToggleCompact,
	handleToggleExpansion,
	hasCompactButton,
	hasIconsWhenExpanded,
	label,
	links,
	listId,
	navId,
}) => (
	<BemRootNodeFC block="kol-nav" modifiers={{ 'is-compact': compact }}>
		<nav aria-label={label} class="kol-nav__navigation" id={navId}>
			<NavListFC
				collapsible={collapsible}
				compact={compact}
				deep={0}
				expandedChildren={expandedChildren}
				handleToggleExpansion={handleToggleExpansion}
				hasIconsWhenExpanded={hasIconsWhenExpanded}
				id={listId}
				links={links}
			/>
		</nav>
		{hasCompactButton && (
			<div class="kol-nav__compact">
				<KolButtonWcTag
					class="kol-nav__toggle-button"
					_ariaControls={navId}
					_ariaExpanded={!compact}
					_icons={compact ? 'kolicon-chevron-right' : 'kolicon-chevron-left'}
					_hideLabel
					_label={compact ? translate('kol-nav-maximize') : translate('kol-nav-minimize')}
					_on={{ onClick: handleToggleCompact }}
					_tooltipAlign="right"
				></KolButtonWcTag>
			</div>
		)}
	</BemRootNodeFC>
);
