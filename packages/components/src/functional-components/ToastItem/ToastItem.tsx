import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { type Toast } from '../../schema';

import KolAlertFc from '../Alert';
import clsx from 'clsx';

type ToastItemProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	status: 'adding' | 'settled' | 'removing';
	toast: Toast;
	onClose: () => void;
};

const ToastItemFc: FC<ToastItemProps> = ({ status, toast, onClose, ...other }) => {
	const { type, label, description, variant } = toast;

	return (
		<div class={clsx('kol-toast-item', `kol-toast-item--${status}`)}>
			<KolAlertFc
				class="kol-toast-item__alert"
				alert={true}
				label={label}
				level={0}
				hasCloser={true}
				type={type}
				variant={variant || 'card'}
				onCloserClick={onClose}
			>
				<div {...other}>{description}</div>
			</KolAlertFc>
		</div>
	);
};

export default ToastItemFc;
