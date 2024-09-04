import type { ModalProps } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';

export const getModalHtml = (props: ModalProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
		},
		props,
	);
	return `
<kol-modal>
	<mock:shadow-root>
		<dialog aria-label="${props._label}" class="kol-modal" style="width: ${props._width || '100%'};">
			<slot></slot>
	 </dialog>
	</mock:shadow-root>
</kol-modal>`;
};
