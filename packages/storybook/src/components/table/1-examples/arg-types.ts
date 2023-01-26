export const argTypes = {
	_caption: {
		control: {
			type: 'text',
			require: true,
		},
		defaultValue: 'Ich bin der Caption-Text.',
	},
	_headers: {
		control: {
			type: 'text',
			require: true,
		},
		defaultValue: JSON.stringify({
			horizontal: [
				[
					{
						label: 'Montag',
						key: 'montag',
					},
					{
						label: 'Dienstag',
						key: 'dienstag',
					},
					{
						label: 'Mittwoch',
						key: 'mittwoch',
					},
				],
			],
		}),
	},
	_data: {
		control: {
			type: 'text',
			require: true,
		},
		defaultValue: JSON.stringify([
			{
				montag: '08:00',
				dienstag: '09:00',
				mittwoch: '10:00',
			},
			{
				montag: '08:30',
				dienstag: '09:30',
				mittwoch: '10:30',
			},
			{
				montag: '08:45',
				dienstag: '09:45',
				mittwoch: '10:45',
			},
		]),
	},
};
