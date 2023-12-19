import { test, expect } from '@playwright/experimental-ct-react';
import { StatusBadgeWithKol } from './StatusBadgeWithKol';

test('should mount', async ({ mount }) => {
	const component = await mount(<StatusBadgeWithKol />);
	await expect(component).toBeVisible();
});
