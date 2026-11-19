import { defineCustomElements } from '@public-ui/components/loader';
import { mount } from '@vue/test-utils';
import { KolButton } from '../src/index.ts';
import { setTagNameTransformer } from '../src/tag-transformer.ts';

type KolButtonElement = HTMLElement & { _label?: string };

describe('KolButton under a tag name transformer', () => {
	beforeAll(async () => {
		setTagNameTransformer((tagName: string) => `${tagName}-sample`);
		await defineCustomElements();
	});

	it('renders the host under the transformed tag with its label', () => {
		const wrapper = mount(KolButton, { props: { _label: 'Save' } });

		expect(wrapper.element.tagName.toLowerCase()).toBe('kol-button-sample');
		expect(customElements.get('kol-button-sample')).toBeDefined();
		expect((wrapper.element as KolButtonElement)._label).toBe('Save');
	});
});
