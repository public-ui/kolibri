import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { FunctionalComponentProps } from '../generic-types';
import { PopoverButtonFC } from '../popover-button/component';
import type { SplitButtonApi } from './api';

const splitButtonBem = bem.forBlock('kol-split-button');
const BEM_CLASS_SPLIT_BUTTON__BUTTON = splitButtonBem('button');
const BEM_CLASS_SPLIT_BUTTON__HORIZONTAL_LINE = splitButtonBem('horizontal-line');
const BEM_CLASS_SPLIT_BUTTON__ROOT = splitButtonBem('root');
const BEM_CLASS_SPLIT_BUTTON__SECONDARY_BUTTON = splitButtonBem('secondary-button');

/**
 * Renders the two halves of the split button: the primary `ButtonFC` and the dropdown
 * `PopoverButtonFC`, separated by the divider.
 *
 * Both halves sit in a box of their own rather than carrying their element class directly. The box
 * has to stay an **ancestor** of the embedded block: base and theme styles reach the buttons
 * through descendant selectors (`.kol-split-button__secondary-button .kol-button__text`), and it is
 * the flex item of `__root` that gives each half its column.
 */
export const SplitButtonFC: FC<FunctionalComponentProps<SplitButtonApi>> = (props) => {
	const { buttonProps, buttonWrapperClass, class: hostClass, dropdownProps, refDropdown } = props;

	return (
		<BemRootNodeFC block="kol-split-button" class={hostClass}>
			<div class={BEM_CLASS_SPLIT_BUTTON__ROOT}>
				<div class={clsx(BEM_CLASS_SPLIT_BUTTON__BUTTON, buttonWrapperClass)}>
					<ButtonFC {...buttonProps} />
				</div>
				<div class={BEM_CLASS_SPLIT_BUTTON__HORIZONTAL_LINE}></div>
				<div class={BEM_CLASS_SPLIT_BUTTON__SECONDARY_BUTTON} ref={refDropdown}>
					<PopoverButtonFC {...dropdownProps} />
				</div>
			</div>
		</BemRootNodeFC>
	);
};
