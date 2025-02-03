import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { translate } from '../../i18n';

type FormFieldCounterProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	currentLength?: number;
	maxLength?: number;
};

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ currentLength, maxLength, class: classNames, ...other }) => {
	return (
		<span class={clsx('kol-form-field__counter', classNames)} {...other} aria-atomic="true" aria-live="polite" data-testid="input-counter">
			{currentLength}
			{maxLength && (
				<>
					<span aria-label={translate('kol-of')} role="img">
						/
					</span>
					{maxLength}
				</>
			)}
			&nbsp;<span>{translate('kol-characters')}</span>
		</span>
	);
};

export default KolFormFieldCounterFc;
