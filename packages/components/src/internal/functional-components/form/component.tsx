import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { FormApi } from './api';

const formBem = bem.forBlock('kol-form');
const BEM_CLASS_FORM = formBem();
const BEM_CLASS_FORM__MANDATORY_FIELDS_HINT = formBem('mandatory-fields-hint');

/**
 * Renders the form element with the mandatory-fields hint and the slotted form content.
 *
 * The `<form>` itself carries the block class: it is the semantic root of the component, and both
 * base and theme styles address it directly. The error list is **not** part of this tree — it is
 * rendered by `FormErrorListFC` as a sibling above the form, where an assistive technology reaches
 * it before the fields it refers to.
 */
export const FormFC: FC<FunctionalComponentProps<FormApi>> = ({ handleReset, handleSubmit, requiredText }) => {
	const hintText = requiredText === true ? translate('kol-form-description') : typeof requiredText === 'string' && requiredText.length > 0 ? requiredText : '';

	return (
		<form class={BEM_CLASS_FORM} method="post" onSubmit={handleSubmit} onReset={handleReset} noValidate>
			{hintText.length > 0 && <p class={BEM_CLASS_FORM__MANDATORY_FIELDS_HINT}>{hintText}</p>}
			<slot />
		</form>
	);
};
