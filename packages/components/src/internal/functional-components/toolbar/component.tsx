import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { FunctionalComponentProps } from '../generic-types';
import { LinkFC } from '../link/component';
import type { ToolbarApi } from './api';
import type { ToolbarButtonItem, ToolbarLinkItem } from './item';

const BEM_CLASS_TOOLBAR__ITEM = bem.forBlock('kol-toolbar')('item');

type ToolbarFCProps = Pick<FunctionalComponentProps<ToolbarApi>, 'currentIndex' | 'itemRecords' | 'label' | 'location' | 'orientation'> & {
	class?: string;
};

/**
 * Renders one entry. `.kol-toolbar__item` stays on a wrapper around the functional component
 * rather than merging onto its root: the themes address it as an ancestor of the button's and
 * link's inner elements (`.kol-toolbar__item:first-child .kol-button__text`), and a wrapper in
 * the place of the former custom element keeps the flex-item box tree unchanged.
 */
const renderItem = (record: ToolbarButtonItem | ToolbarLinkItem, index: number, currentIndex: number, location: string) => {
	const tabIndex = index === currentIndex && !record.disabled ? 0 : -1;

	return (
		<div class={BEM_CLASS_TOOLBAR__ITEM} key={index} ref={record.refWrapper}>
			{record.type === 'link' ? <LinkFC {...record.getFcProps(tabIndex, location)} /> : <ButtonFC {...record.getFcProps(tabIndex)} />}
		</div>
	);
};

export const ToolbarFC: FC<ToolbarFCProps> = ({ class: hostClass, currentIndex, itemRecords, label, location, orientation }) => (
	<BemRootNodeFC
		block="kol-toolbar"
		class={hostClass}
		modifiers={{ 'orientation-horizontal': orientation === 'horizontal', 'orientation-vertical': orientation === 'vertical' }}
		role="toolbar"
		aria-label={label}
	>
		{itemRecords.map((record, index) => renderItem(record, index, currentIndex, location))}
	</BemRootNodeFC>
);
