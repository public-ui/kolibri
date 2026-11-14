import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../../internals/src/schema/bem-registry';
import { IconFC } from '../icon/component';

const singleSelectBem = bem.forBlock('kol-single-select');
const customSuggestionsToggleBem = bem.forBlock('kol-custom-suggestions-toggle');

export const BEM_CLASS_SINGLE_SELECT__DELETE = singleSelectBem('delete');

const BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE = singleSelectBem('no-results-message');

export type SingleSelectToggleFCProps = {
	disabled: boolean;
	handleClick: (event: Event) => void;
};

/** Opens and closes the option list. */
export const SingleSelectToggleFC: FC<SingleSelectToggleFCProps> = ({ disabled, handleClick }) => (
	<IconFC icons="kolicon-chevron-down" label="" class={customSuggestionsToggleBem({ disabled })} onClick={handleClick} />
);

/**
 * Visible no-results message, rendered as a sibling after the listbox. A listbox owns nothing but
 * option and group children, and `aria-hidden` does not lift that DOM restriction — inside the
 * `<ul role="listbox">` the message could only be an `<li>`, which no compliant role can carry.
 * `SingleSelectNoResultsStatusFC` announces it to assistive technology.
 */
export const SingleSelectNoResultsFC: FC<{ message: string }> = ({ message }) => <div class={BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE}>{message} </div>;

/**
 * Live region outside the listbox that announces the no-results message. It stays in the DOM, so a
 * screen reader registers it before its text changes; the text is empty while there are results.
 */
export const SingleSelectNoResultsStatusFC: FC<{ message: string }> = ({ message }) => (
	<span class="visually-hidden" role="status">
		{message}
	</span>
);
