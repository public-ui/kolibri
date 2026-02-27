import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { translate } from '../../../i18n';
import type { SpinVariantPropType } from '../../../schema';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { SpinApi } from './api';

function renderSpin(variant: SpinVariantPropType): JSX.Element {
	switch (variant) {
		case 'cycle':
			return <span class="kol-spin__loader"></span>;
		case 'none':
			return <slot name="expert"></slot>;
		default:
			return (
				<>
					<span class="kol-spin__spinner-element kol-spin__spinner-element--1"></span>
					<span class="kol-spin__spinner-element kol-spin__spinner-element--2"></span>
					<span class="kol-spin__spinner-element kol-spin__spinner-element--3"></span>
					<span class="kol-spin__spinner-element kol-spin__spinner-element--neutral"></span>
				</>
			);
	}
}

export const SpinFC: FC<FunctionalComponentProps<SpinApi>> = (props) => {
	const { label, show, showToggled, variant } = props;
	const translateActionRunning = translate('kol-action-running');
	const translateActionDone = translate('kol-action-done');

	return (
		<div class="kol-spin">
			{show ? (
				<Fragment>
					<span class={clsx('kol-spin__spinner', `kol-spin__spinner--${variant}`)}>{renderSpin(variant)}</span>
					<span aria-busy="true" class="visually-hidden" role="alert">
						{label || translateActionRunning}
					</span>
				</Fragment>
			) : (
				showToggled && (
					<span aria-busy="false" class="visually-hidden" role="alert">
						{label || translateActionDone}
					</span>
				)
			)}
		</div>
	);
};
