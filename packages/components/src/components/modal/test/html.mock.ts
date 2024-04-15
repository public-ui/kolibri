import type { ModalProps } from '@public-ui/schema';

export const getModalHtml = (props: ModalProps): string => {
	return `
<kol-modal class="kol-modal">
  <mock:shadow-root>
  </mock:shadow-root>
</kol-modal>`;
};
