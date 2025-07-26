import { Fragment, type FunctionalComponent as FC, h } from '@stencil/core';
import KolIconFc from '../Icon';
import type { AlertType } from '../../schema';
import { translate } from '../../i18n';
import { BEM_CLASS_ALERT__ICON } from '../Alert/bem';

const translateError = translate('kol-error');
const translateInfo = translate('kol-info');
const translateWarning = translate('kol-warning');
const translateSuccess = translate('kol-success');
const translateMessage = translate('kol-message');

/**
 * The icon uses a visually-hidden span instead of an aria-label because the Alert might be referenced as content for aria-describedby.
 * In this scenario, Firefox with NVDA does not properly read the aria-label, so the visually-hidden span ensures correct screen reader behavior.
 * @see https://github.com/public-ui/kolibri/issues/7119
 */
const Icon: FC<{ ariaLabel: string; icon: string; label?: string }> = ({ ariaLabel, icon }) => {
	return (
		<>
			<span class="visually-hidden">{ariaLabel}</span>
			<KolIconFc class={BEM_CLASS_ALERT__ICON} label="" icons={icon} />
		</>
	);
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type, label }) => {
	switch (type) {
		case 'error':
			return <Icon ariaLabel={translateError} icon="codicon codicon-error" label={label} />;
		case 'info':
			return <Icon ariaLabel={translateInfo} icon="codicon codicon-info" label={label} />;
		case 'warning':
			return <Icon ariaLabel={translateWarning} icon="codicon codicon-warning" label={label} />;
		case 'success':
			return <Icon ariaLabel={translateSuccess} icon="codicon codicon-pass" label={label} />;
		default:
			return <Icon ariaLabel={translateMessage} icon="codicon codicon-comment" label={label} />;
	}
};

export default AlertIcon;
