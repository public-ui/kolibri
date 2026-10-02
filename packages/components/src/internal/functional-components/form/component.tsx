import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { FormApi } from './api';
import type { FormErrorListFCProps } from './error-list';
import { FormErrorListFC } from './error-list';

const formBem = bem.forBlock('kol-form');
const BEM_CLASS_FORM = formBem();
const BEM_CLASS_FORM__MANDATORY_FIELDS_HINT = formBem('mandatory-fields-hint');

type FormFCProps = FunctionalComponentProps<FormApi> & Pick<FormErrorListFCProps, 'alertHeadingId' | 'closerAriaDescriptionId'>;

/**
 * Renders the form element with the error summary, the mandatory-fields hint and the slotted form
 * content.
 *
 * The `<form>` is the root and carries the block class: base and theme styles address it directly.
 * The summary comes first, so an assistive technology reaches it before the fields it refers to. It
 * holds links only, nothing that could submit the form.
 */
export const FormFC: FC<FormFCProps> = ({ alertHeadingId, closerAriaDescriptionId, errorLinkItems, handleReset, handleSubmit, requiredText }) => {
	const hintText = requiredText === true ? translate('kol-form-description') : typeof requiredText === 'string' && requiredText.length > 0 ? requiredText : '';

	return (
		<form class={BEM_CLASS_FORM} method="post" onSubmit={handleSubmit} onReset={handleReset} noValidate>
			{errorLinkItems.length > 0 && (
				<FormErrorListFC alertHeadingId={alertHeadingId} closerAriaDescriptionId={closerAriaDescriptionId} errorLinkItems={errorLinkItems} />
			)}
			{hintText.length > 0 && <p class={BEM_CLASS_FORM__MANDATORY_FIELDS_HINT}>{hintText}</p>}
			<slot />
		</form>
	);
};
