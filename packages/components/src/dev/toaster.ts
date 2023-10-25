import { ToasterService } from '../components/toast-container/toaster';

const toaster = ToasterService.getInstance(document);

void toaster.enqueue({
	description: `Toasty`,
	label: `Initial Toast`,
	type: 'warning',
});

let myToastId = 0;

document.getElementById('oneToast')?.addEventListener('kol-click', () => {
	void toaster.enqueue({
		description: `Toasty ${++myToastId}`,
		label: `Label`,
		type: 'warning',
	});
});

document.getElementById('manyToast')?.addEventListener('kol-click', () => {
	for (let i = 0; i < 5; i++) {
		void toaster.enqueue({
			description: `Toasty ${++myToastId}`,
			label: `Label`,
			type: 'warning',
		});
	}
});
