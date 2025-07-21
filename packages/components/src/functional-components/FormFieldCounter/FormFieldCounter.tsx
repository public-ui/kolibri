import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { translate } from '../../i18n';
const translateOf = translate('kol-of');
const translateCharacters = translate('kol-characters');

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
					<span aria-label={translateOf} role="img">
						/
					</span>
					{maxLength}
				</>
			)}
			&nbsp;<span>{translateCharacters}</span>
		</span>
	);
};

export default KolFormFieldCounterFc;
