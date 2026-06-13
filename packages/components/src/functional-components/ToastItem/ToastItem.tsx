import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { type Toast } from '../../schema';

import type { ButtonController } from '../../internal/functional-components/button/controller';
import { getEmbeddedButtonController } from '../../internal/functional-components/button/render';
import clsx from '../../utils/clsx';
import KolAlertFc from '../Alert';

type ToastItemProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	status: 'adding' | 'settled' | 'removing';
	toast: Toast;
	onClose: () => void;
	closeButtonCtrl?: ButtonController;
};

/**
 * @deprecated Will be removed in the next major version together with `kol-toast-container`. See https://github.com/public-ui/kolibri/issues/8372
 * @internal
 */
const ToastItemFc: FC<ToastItemProps> = ({ status, toast, onClose, closeButtonCtrl, ...other }) => {
	const ctrl = closeButtonCtrl ?? getEmbeddedButtonController(`toast-close-${toast.label}`);
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
				closeButtonCtrl={ctrl}
			>
				<div {...other}>{description}</div>
			</KolAlertFc>
		</div>
	);
};

export default ToastItemFc;
