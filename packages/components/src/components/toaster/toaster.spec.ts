import { bootstrap } from '../../core/bootstrap';
import { ToasterService } from './toaster';

describe('ToasterService', () => {
	it('creates the toast container under the tag name the transformer produces', async () => {
		await bootstrap([], [], { transformTagName: (tagName) => `app-${tagName}` });

		const toaster = ToasterService.getInstance(document);
		expect(document.querySelector('app-kol-toast-container')).not.toBeNull();

		toaster.dispose();
		document.querySelector('app-kol-toast-container')?.remove();
	});
});
