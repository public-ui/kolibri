import { Fragment, type FunctionalComponent as FC, h } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import type { AlertType } from '../../schema';
import { translate } from '../../i18n';

/**
 * The icon uses a visually-hidden span instead of an aria-label because the Alert might be referenced as content for aria-describedby.
 * In this scenario, Firefox with NVDA does not properly read the aria-label, so the visually-hidden span ensures correct screen reader behavior.
 * @see https://github.com/public-ui/kolibri/issues/7119
 */
const Icon: FC<{ ariaLabel: string; icon: string; label?: string }> = ({ ariaLabel, icon }) => {
	return (
		<>
			<span class="visually-hidden">{ariaLabel}</span>
			<KolIconTag class="kol-alert__heading-icon" _label="" _icons={icon} />
		</>
	);
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type, label }) => {
	switch (type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" label={label} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" label={label} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" label={label} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" label={label} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" label={label} />;
	}
};

export default AlertIcon;
