import { type FunctionalComponent as FC, h } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type { JSXBase } from '@stencil/core/internal';

const translateDropdown = translate('kol-dropdown');

export type CustomSuggestionsToggleProps = JSXBase.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean };

const CustomSuggestionsToggleFc: FC<CustomSuggestionsToggleProps> = ({ onClick, disabled }) => {
	return (
		<button tabindex="-1" class="kol-custom-suggestions-toggle" onClick={onClick} disabled={disabled}>
			<KolIconTag _icons="codicon codicon-triangle-down" _label={translateDropdown} />
		</button>
	);
};
export default CustomSuggestionsToggleFc;
