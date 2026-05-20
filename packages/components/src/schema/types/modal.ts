export type KoliBriModalEventCallbacks = {
	onCancel?: (event: Event) => void;
	onClose?: () => void;
	onToggle?: (open: boolean) => void;
};
