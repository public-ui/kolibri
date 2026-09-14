import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { AlertFC } from '../../internal/functional-components/alert/component';
import { type Toast } from '../../schema';

import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';

type ToastItemProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	status: 'adding' | 'settled' | 'removing';
	toast: Toast;
	onClose: () => void;
};

/**
 * @deprecated Will be removed in the next major version together with `kol-toast-container`. See https://github.com/public-ui/kolibri/issues/8372
 * @internal
 */
const ToastItemFc: FC<ToastItemProps> = ({ status, toast, onClose, ...other }) => {
	const { type, label, description, variant } = toast;

	return (
		<div class={clsx('kol-toast-item', `kol-toast-item--${status}`)}>
			<AlertFC
				alert={true}
				class="kol-toast-item__alert"
				handleCloserClick={onClose}
				hasCloser={true}
				headingId={createUniqueId('alert-heading')}
				label={label}
				level={0}
				type={type}
				variant={variant || 'card'}
			>
				<div {...other}>{description}</div>
			</AlertFC>
		</div>
	);
};

export default ToastItemFc;
