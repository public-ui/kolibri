import type { E2EPage } from '@stencil/playwright';

const setContentWithRetry = async (page: Pick<E2EPage, 'setContent' | 'waitForTimeout'>, html: string) => {
	try {
		await page.setContent(html);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (!message.includes('page.waitForFunction: Timeout')) {
			throw error;
		}
		await page.waitForTimeout(250);
		await page.setContent(html);
	}
};

export { setContentWithRetry };
