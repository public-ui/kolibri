export function useAlert() {
	const message = (message?: string) => {
		void alert(message || 'The Element was clicked');
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
