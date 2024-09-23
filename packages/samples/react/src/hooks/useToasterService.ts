import { ToasterService } from '@public-ui/components';

export function useToasterService() {
	const toaster = ToasterService.getInstance(document);

	const message = () => {
		void toaster.enqueue({
			description: 'Hello',
			label: `Hello`,
			type: 'info',
		});
	};

	const dummyClickEventHandler = () => {
		message();
	};

	return {
		dummyClickEventHandler,
	};
}
