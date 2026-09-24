import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { TabsApi } from './api';

const tabsBem = bem.forBlock('kol-tabs');
const BEM_CLASS_TABS__BUTTON_CREATE = tabsBem('button-create');
const BEM_CLASS_TABS__BUTTON_GROUP = tabsBem('button-group');
const BEM_CLASS_TABS__CONTENT = tabsBem('content');
const BEM_CLASS_TABS__TAB = tabsBem('tab');

/**
 * Renders the tab list and the empty panel container. The panels themselves are managed by the
 * web component (see `TabsApi` → `refContent`).
 *
 * Every button sits in a box of its own rather than being a direct child of the tab list: the box
 * is the flex item that sizes the tab, and it keeps the embedded `.kol-button` block a descendant
 * of `__button-create`, which the base and theme styles rely on.
 */
export const TabsFC: FC<FunctionalComponentProps<TabsApi>> = (props) => {
	const { align, class: hostClass, createButton, handleBlur, handleKeyDown, hasCreateButton, label, refContent, refRoot, tabButtons } = props;

	return (
		<BemRootNodeFC block="kol-tabs" modifiers={{ [`align-${align}`]: true }} class={hostClass} ref={refRoot}>
			{/* The tab buttons inside are focusable; the tab list itself is not. */}
			{/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
			<div aria-label={label} class={BEM_CLASS_TABS__BUTTON_GROUP} role="tablist" onKeyDown={handleKeyDown} onBlur={handleBlur}>
				{tabButtons.map(({ buttonProps, refBox }) => (
					<div class={BEM_CLASS_TABS__TAB} ref={refBox}>
						<ButtonFC {...buttonProps} />
					</div>
				))}
				{hasCreateButton && (
					<div class={BEM_CLASS_TABS__BUTTON_CREATE} ref={createButton.refBox}>
						<ButtonFC {...createButton.buttonProps} />
					</div>
				)}
			</div>
			<div class={BEM_CLASS_TABS__CONTENT} ref={refContent}></div>
		</BemRootNodeFC>
	);
};
