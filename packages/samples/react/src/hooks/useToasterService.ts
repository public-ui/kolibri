import { ToasterService } from '@public-ui/components';

export function useToasterService() {
	const toaster = ToasterService.getInstance(document);

	const message = (message?: string) => {
		void toaster.enqueue({
			description: message || 'Hello',
			label: `Hello`,
			type: 'info',
		});
	};

	const dummyClickEventHandler = () => {
		message();
	};

	const buttonWithTextClickEventHandler = (e: Event) => {
		const text = (e.currentTarget as { textContent?: string }).textContent;
		message(text);
	};

	return {
		dummyClickEventHandler,
		buttonWithTextClickEventHandler,
	};
}
