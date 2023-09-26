export type Fehler = {
	_label: string;
	_selector: string;
};

export type FormProps = {
	onSubmitted: (event: Event) => void;
};

export type FormState = {
	loader: boolean;
	touched: boolean;
};
