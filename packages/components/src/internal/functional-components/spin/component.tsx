import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import type { SpinVariantType } from '../../props';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { SpinApi } from './api';

const spinBem = bem.forBlock('kol-spin');
const BEM_CLASS_SPIN__LOADER = spinBem('loader');
const DOT_ELEMENTS = ['1', '2', '3', 'neutral'] as const;

function renderSpinVariant(variant: SpinVariantType): unknown {
	switch (variant) {
		case 'cycle':
			return <span class={BEM_CLASS_SPIN__LOADER}></span>;
		case 'none':
			return <slot name="expert"></slot>;
		default:
			return DOT_ELEMENTS.map((element) => <span class={spinBem('spinner-element', { [element]: true })}></span>);
	}
}

export const SpinFC: FC<FunctionalComponentProps<SpinApi>> = (props) => {
	const { show, label, variant } = props;

	return (
		<BemRootNodeFC block="kol-spin">
			{show ? (
				<Fragment>
					<span class={spinBem('spinner', { [variant]: true })}>{renderSpinVariant(variant)}</span>
					<span aria-busy="true" class="visually-hidden" role="alert">
						{label || translate('kol-action-running')}
					</span>
				</Fragment>
			) : (
				<span aria-busy="false" class="visually-hidden" role="alert">
					{label || translate('kol-action-done')}
				</span>
			)}
		</BemRootNodeFC>
	);
};
