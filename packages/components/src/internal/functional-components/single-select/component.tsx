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

/** Takes the place of the options when the filter matches none; `role="alert"` lets a screen reader announce it. */
export const SingleSelectNoResultsFC: FC<{ message: string }> = ({ message }) => (
	<li class={BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE} role="alert">
		{message}{' '}
	</li>
);
