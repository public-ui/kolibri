import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../../schema';
import { createRelatedUniqueId } from '../../../utils/dev.utils';

export type SuggestionsFCProps = JSXBase.HTMLAttributes<HTMLDataListElement> & {
	/** ID of the input; the datalist gets the related `list` ID. */
	id: string;
	suggestions: W3CInputValue[];
};

/** Datalist with the suggested values of an input. */
export const SuggestionsFC: FC<SuggestionsFCProps> = ({ id, suggestions, ...other }) => {
	if (!suggestions) {
		return null;
	}

	return (
		<datalist id={createRelatedUniqueId(id, 'list')} {...other}>
			{suggestions.map((option: W3CInputValue) => (
				<option value={option} />
			))}
		</datalist>
	);
};
