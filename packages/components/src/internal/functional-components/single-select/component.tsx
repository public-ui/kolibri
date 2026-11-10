import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
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
 * Takes the place of the options when the filter matches none. It is visual only: a listbox may own
 * nothing but options and groups, so `SingleSelectNoResultsStatusFC` announces the message instead.
 */
export const SingleSelectNoResultsFC: FC<{ message: string }> = ({ message }) => (
	<li aria-hidden="true" class={BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE}>
		{message}{' '}
	</li>
);

/**
 * Live region outside the listbox that announces the no-results message. It stays in the DOM, so a
 * screen reader registers it before its text changes; the text is empty while there are results.
 */
export const SingleSelectNoResultsStatusFC: FC<{ message: string }> = ({ message }) => (
	<span class="visually-hidden" role="status">
		{message}
	</span>
);
