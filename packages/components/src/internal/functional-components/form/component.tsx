import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { FormApi } from './api';
import type { FormErrorListFCProps } from './error-list';
import { FormErrorListFC } from './error-list';

const formBem = bem.forBlock('kol-form');
const BEM_CLASS_FORM__FORM = formBem('form');
const BEM_CLASS_FORM__MANDATORY_FIELDS_HINT = formBem('mandatory-fields-hint');

type FormFCProps = FunctionalComponentProps<FormApi> & Pick<FormErrorListFCProps, 'alertHeadingId' | 'closerAriaDescriptionId'>;

/**
 * Renders the error summary above the form element, which holds the mandatory-fields hint and the
 * slotted form content. The summary comes first, so an assistive technology reaches it before the
 * fields it refers to.
 */
export const FormFC: FC<FormFCProps> = ({ alertHeadingId, closerAriaDescriptionId, errorLinkItems, handleReset, handleSubmit, requiredText }) => {
	const hintText = requiredText === true ? translate('kol-form-description') : typeof requiredText === 'string' && requiredText.length > 0 ? requiredText : '';

	return (
		<BemRootNodeFC block="kol-form">
			{errorLinkItems.length > 0 && (
				<FormErrorListFC alertHeadingId={alertHeadingId} closerAriaDescriptionId={closerAriaDescriptionId} errorLinkItems={errorLinkItems} />
			)}
			<form class={BEM_CLASS_FORM__FORM} method="post" onSubmit={handleSubmit} onReset={handleReset} noValidate>
				{hintText.length > 0 && <p class={BEM_CLASS_FORM__MANDATORY_FIELDS_HINT}>{hintText}</p>}
				<slot />
			</form>
		</BemRootNodeFC>
	);
};
