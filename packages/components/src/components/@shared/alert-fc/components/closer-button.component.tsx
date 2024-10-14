import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { KolButtonWcTag } from '../../../../core/component-names';
import { translate } from '../../../../i18n';

const CloserButton: FC<{ label?: string; onClick?: () => void }> = (props) => {
	return (
		<KolButtonWcTag
			class="close"
			_ariaDescription={props.label?.trim() || ''}
			_hideLabel
			_icons={{
				left: {
					icon: 'codicon codicon-close',
				},
			}}
			_label={translate('kol-close-alert')}
			_on={{ onClick: props.onClick }}
			_tooltipAlign="left"
		/>
	);
};

export default CloserButton;
