import { describe, expect, it, jest } from '@jest/globals';
import type { ClickButtonController } from '../click-button/controller';
import type { WebComponentInterface } from '../generic-types';
import type { SkeletonApi } from './api';
import { SkeletonController } from './controller';

describe('SkeletonController', () => {
	it('delegates focusButton to injected ClickButtonController', () => {
		const component = { show: true } as WebComponentInterface<SkeletonApi>;
		const watchLabel = jest.fn();
		const clickButtonController = {
			focusButton: jest.fn(),
			watchLabel,
			setButtonRef: jest.fn(),
			componentWillLoad: jest.fn(),
		} as unknown as ClickButtonController;
		const controller = new SkeletonController(component, clickButtonController);

		controller.focusButton();

		expect(clickButtonController.focusButton).toHaveBeenCalled();
	});

	it('normalizes labels and forwards them to the click button controller', () => {
		const component = { label: 'Label', show: true } as WebComponentInterface<SkeletonApi>;
		const watchLabel = jest.fn();
		const clickButtonController = {
			watchLabel,
			focusButton: jest.fn(),
			setButtonRef: jest.fn(),
			componentWillLoad: jest.fn(),
		} as unknown as ClickButtonController;
		const controller = new SkeletonController(component, clickButtonController);

		controller.watchLabel('Submit form');

		expect(component.label).toBe('Submit form');
		expect(watchLabel).toHaveBeenCalledWith('Submit form');
	});
});
