import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import type { LinkApi } from '../link/api';
import { linkPropsConfig } from '../link/api';
import { LinkFC } from '../link/component';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import type { TreeItemApi } from './api';

const treeItemBem = bem.forBlock('kol-tree-item');
const BEM_CLASS_TREE_ITEM = treeItemBem();
const BEM_CLASS_TREE_ITEM__CHILDREN = treeItemBem('children');
const BEM_CLASS_TREE_ITEM__LINK_INNER = treeItemBem('link-inner');
const BEM_CLASS_TREE_ITEM__TEXT = treeItemBem('text');
const BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON = treeItemBem('toggle-button');
const BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_ICON = treeItemBem('toggle-button-icon');
const BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_PLACEHOLDER = treeItemBem('toggle-button-placeholder');

/**
 * Link props the tree item never changes. Read-only: the object is shared by every render of
 * every item.
 */
const LINK_DEFAULTS = Object.freeze(buildDefaultPropsFromConfig(linkPropsConfig)) as FunctionalComponentProps<LinkApi>;

const noop = (): void => undefined;

/**
 * Renders one tree entry: the link carrying the `treeitem` role, and the group holding the nested items.
 *
 * `__link` is a wrapper around the link instead of a class on its BEM root: every theme
 * addresses the link as a descendant (`.kol-tree-item__link .kol-link`) and gives the wrapper
 * its own box (`display: block`, border, hover background). The wrapper is an inline `<span>`,
 * so without theme rules it adds no box of its own.
 *
 * The label is rendered into the link's expert slot, next to the chevron that expands the item.
 */
export const TreeItemFC: FC<FunctionalComponentProps<TreeItemApi>> = ({
	active,
	ariaCurrent,
	groupId,
	handleAnchorClick,
	handleSlotchange,
	handleToggleClick,
	hasChildren,
	href,
	label,
	level,
	open,
	refAnchor,
}) => (
	<li class={BEM_CLASS_TREE_ITEM} style={{ '--level': `${level}` }}>
		<span class={treeItemBem('link', { active, 'first-level': level === 0 })}>
			<LinkFC
				{...LINK_DEFAULTS}
				ariaCurrent={ariaCurrent}
				ariaDescriptionId=""
				ariaExpanded={hasChildren ? (open ? 'true' : 'false') : ''}
				ariaOwns={hasChildren ? groupId : ''}
				expertSlot={true}
				handleAnchorClick={handleAnchorClick}
				href={href}
				label=""
				refAnchor={refAnchor}
				refTooltip={noop}
				role="treeitem"
				tabIndex={active ? 0 : -1}
			>
				<span class={BEM_CLASS_TREE_ITEM__LINK_INNER}>
					{hasChildren ? (
						// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events -- the link itself is the keyboard target; the tree handles the arrow keys.
						<span class={BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON} onClick={handleToggleClick}>
							<IconFC
								class={BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_ICON}
								icons={`kolicon kolicon-${open ? 'chevron-down' : 'chevron-right'}`}
								label={'' /* Label deliberately left empty */}
							/>
						</span>
					) : (
						<span class={BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_PLACEHOLDER}></span>
					)}
					<span class={BEM_CLASS_TREE_ITEM__TEXT}>{label}</span>
				</span>
			</LinkFC>
		</span>
		<ul class={BEM_CLASS_TREE_ITEM__CHILDREN} hidden={!hasChildren || !open} role="group" id={groupId}>
			<slot onSlotchange={handleSlotchange} />
		</ul>
	</li>
);
