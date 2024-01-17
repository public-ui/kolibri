import { onMount, onUpdate, useStore } from '@builder.io/mitosis';
import { ButtonProps, ButtonStates } from '@public-ui/schema';

export default function MyBasicComponent(props: ButtonProps) {
	const state = useStore<{
		state2: ButtonStates;
	}>({
		state2: {
			_label: '...',
			_icons: {},
			_on: {},
			_type: 'button',
			_variant: 'primary',
		},
	});

	onMount(() => {
		console.log('mounted', props);
	});
	onUpdate(console.log);

	return <button>{state.state2._label}</button>;
}
