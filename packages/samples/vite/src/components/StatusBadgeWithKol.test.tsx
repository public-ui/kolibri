import { test, expect } from '@playwright/experimental-ct-react';
import { StatusBadgeWithKol } from './StatusBadgeWithKol';

test('should mount', async ({ browserName, mount }) => {
	test.skip(browserName === 'webkit', 'Test does not work in WebKit');
	const component = await mount(<StatusBadgeWithKol />);
	await expect(component).toBeVisible();
});
