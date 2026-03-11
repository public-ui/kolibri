import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { IconApi } from './api';

const iconBem = bem.forBlock('kol-icon');
const BEM_CLASS_ICON = iconBem();
const BEM_CLASS_ICON__ICON = iconBem('icon');

export const IconFC: FC<FunctionalComponentProps<IconApi>> = ({ class: classNames, icons, label, ...htmlAttributes }) => {
	// label should be trimmed by normalization in controller
	const hasAriaLabel = label?.length > 0;
	return (
		<i
			{...htmlAttributes}
			/**
			 * Die Auszeichnung `aria-hidden` ist eigentlich nicht erforderlich, da die aktuellen
			 * Screenreader, wie NVDA und JAWS, es auch ohne `aria-hidden` nicht vorlesen.
			 *
			 * Referenz: https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
			 */
			aria-hidden={hasAriaLabel ? undefined : 'true'}
			aria-label={hasAriaLabel ? label : undefined}
			class={clsx(BEM_CLASS_ICON, BEM_CLASS_ICON__ICON, icons, classNames)}
			role={hasAriaLabel ? 'img' : 'presentation'}
		/>
	);
};
