import { newSpecPage } from '@stencil/core/testing';
import { KolClickButton } from '../component';

describe('KolClickButton', () => {
	it('calls handleClick when clicked', async () => {
		const page = await newSpecPage({
			components: [KolClickButton],
			html: `<kol-click-button _label="Click"></kol-click-button>`,
		});
		const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		const button = page.root!.shadowRoot!.querySelector('button')!;
		button.click();
		expect(logSpy).toHaveBeenCalled();
		logSpy.mockRestore();
	});
});
