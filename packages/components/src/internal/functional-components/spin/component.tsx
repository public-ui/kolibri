import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { translate } from '../../../i18n';
import type { FunctionalComponentProps } from '../generic-types';
import type { SpinApi } from './api';

function renderSpinVariant(variant: string): unknown {
	switch (variant) {
		case 'cycle':
			return <span class={`kol-spin__loader kol-spin__spinner--${variant}__element`}></span>;
		case 'none':
			return <slot name="expert"></slot>;
		default:
			return (
				<>
					<span
						class={`kol-spin__spinner-element
							kol-spin__spinner-element--1
							kol-spin__spinner--${variant}__element
							kol-spin__spinner--${variant}__element--1`}
					></span>
					<span
						class={`kol-spin__spinner-element
							kol-spin__spinner-element--2
							kol-spin__spinner--${variant}__element
							kol-spin__spinner--${variant}__element--2`}
					></span>
					<span
						class={`kol-spin__spinner-element
							kol-spin__spinner-element--3
							kol-spin__spinner--${variant}__element
							kol-spin__spinner--${variant}__element--3`}
					></span>
					<span
						class={`kol-spin__spinner-element
							kol-spin__spinner-element--neutral
							kol-spin__spinner--${variant}__element
							kol-spin__spinner--${variant}__element--4`}
					></span>
				</>
			);
	}
}

export const SpinFC: FC<FunctionalComponentProps<SpinApi>> = (props) => {
	const { show, label, variant } = props;

	return (
		<Fragment>
			{show ? (
				<Fragment>
					<span class={`kol-spin__spinner kol-spin__spinner--${variant}`}>{renderSpinVariant(variant)}</span>
					<span aria-busy="true" class="visually-hidden" role="alert">
						{label || translate('kol-action-running')}
					</span>
				</Fragment>
			) : (
				<span aria-busy="false" class="visually-hidden" role="alert">
					{label || translate('kol-action-done')}
				</span>
			)}
		</Fragment>
	);
};
