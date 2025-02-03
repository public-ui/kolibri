import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../schema';

export type SuggestionsProps = JSXBase.HTMLAttributes<HTMLDataListElement> & {
	id: string;
	suggestions: W3CInputValue[];
};

const SuggestionsFc: FC<SuggestionsProps> = ({ id, suggestions, ...other }) => {
	if (!suggestions) {
		return null;
	}

	return (
		<datalist id={`${id}-list`} {...other}>
			{suggestions.map((option: W3CInputValue) => (
				<option value={option} />
			))}
		</datalist>
	);
};
export default SuggestionsFc;
