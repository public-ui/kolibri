import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { translate } from '../../i18n';
import { createRelatedUniqueId } from '../../utils/dev.utils';

type FormFieldCharacterLimitHintProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	id: string;
	maxLength: number;
};

const KolFormFieldCharacterLimitHintFc: FC<FormFieldCharacterLimitHintProps> = ({ id, maxLength }) => {
	return (
		<span id={createRelatedUniqueId(id, 'character-limit-hint')} class="visually-hidden">
			{translate('kol-character-limit-hint', { placeholders: { limit: String(maxLength) } })}
		</span>
	);
};

export default KolFormFieldCharacterLimitHintFc;
