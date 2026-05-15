export type KoliBriModalEventCallbacks = {
	onCancel?: () => boolean | void;
	onClose?: () => void;
	onToggle?: (open: boolean) => void;
};
