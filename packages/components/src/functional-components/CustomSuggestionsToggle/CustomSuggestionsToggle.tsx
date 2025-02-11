import { type FunctionalComponent as FC, h } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type { JSXBase } from '@stencil/core/internal';

export type CustomSuggestionsToggleProps = JSXBase.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean };

const CustomSuggestionsToggleFc: FC<CustomSuggestionsToggleProps> = ({ onClick, disabled }) => {
	return (
		<button tabindex="-1" class="kol-custom-suggestions-toggle" onClick={onClick} disabled={disabled}>
			<KolIconTag _icons="codicon codicon-triangle-down" _label={translate('kol-dropdown')} />
		</button>
	);
};
export default CustomSuggestionsToggleFc;
