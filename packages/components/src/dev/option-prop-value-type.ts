type OptionElement = HTMLElement & {
	_on: {
		onChange: (value: unknown) => void;
	};
	_options?: {
		label: string;
		value: unknown;
	}[];
};

const on = {
	onChange: console.log,
};

document.querySelectorAll('.string').forEach((el) => {
	const input = el as OptionElement;
	input._on = on;
	input._options = [
		{
			label: '123',
			value: '123',
		},
		{
			label: '012',
			value: '012',
		},
	];
});

document.querySelectorAll('.number').forEach((el) => {
	const input = el as OptionElement;
	input._on = on;
	input._options = [
		{
			label: '123',
			value: 123,
		},
		{
			label: '012',
			value: 12,
		},
	];
});

export default {}; // make file a module
