import { describe, expect, it } from '@jest/globals';
import { TooltipDecorator } from '../decorator';

describe('TooltipDecorator', () => {
	const createDecorator = (wrapperClass?: string) => new TooltipDecorator({ getTrigger: () => undefined, wrapperClass });

	describe('render', () => {
		it('returns null when not visible', () => {
			const decorator = createDecorator();
			expect(decorator.render({ label: 'Some label', visible: false })).toBeNull();
		});

		it('returns null when there is no label', () => {
			const decorator = createDecorator();
			expect(decorator.render({ label: '', visible: true })).toBeNull();
		});

		it('returns a vnode when visible and a label is set', () => {
			const decorator = createDecorator();
			expect(decorator.render({ label: 'Some label', visible: true })).not.toBeNull();
		});

		it('returns a vnode when a wrapperClass is provided', () => {
			const decorator = createDecorator('kol-button__tooltip');
			expect(decorator.render({ label: 'Some label', visible: true })).not.toBeNull();
		});
	});
});
