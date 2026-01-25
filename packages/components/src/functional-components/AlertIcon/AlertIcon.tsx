import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type { AlertType } from '../../schema';
import { bem } from '../../schema/bem-registry';

const alertBem = bem.forBlock('kol-alert');
const BEM_CLASS_ALERT__ICON = alertBem('icon');

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
			<KolIconTag class={BEM_CLASS_ALERT__ICON} _label="" _icons={icon} />
		</>
	);
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type, label }) => {
	switch (type) {
		case 'error':
			return <Icon ariaLabel={translateError} icon="kolicon-alert-error" label={label} />;
		case 'info':
			return <Icon ariaLabel={translateInfo} icon="kolicon-alert-info" label={label} />;
		case 'warning':
			return <Icon ariaLabel={translateWarning} icon="kolicon-alert-warning" label={label} />;
		case 'success':
			return <Icon ariaLabel={translateSuccess} icon="kolicon-alert-success" label={label} />;
		default:
			return <Icon ariaLabel={translateMessage} icon="kolicon-alert-info" label={label} />;
	}
};

export default AlertIcon;
