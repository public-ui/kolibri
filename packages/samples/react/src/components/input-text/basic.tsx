import { KolHeading, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<KolHeading _level={1} _label="Input Text" />
			<p>This story showcases basic KolInputText usage: simple text input, with error message, and disabled state.</p>
		</SampleDescription>

		<div className="flex flex-col gap-12 py-8">
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Default" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText className="max-w-[400px]" _label="Name" _value="Anderson-Clark" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="With error message" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText className="max-w-[400px]" _label="Name" _required _msg={{ _type: 'error', _description: 'Please enter your name' }} _touched />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="With hint" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText className="max-w-[400px]" _label="Name" _required _hint="Enter your surname" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Disabled" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText className="max-w-[400px]" _label="Name" _value="Anderson-Clark" _disabled />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Readonly" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText className="max-w-[400px]" _label="Name" _readOnly _value="Anderson-Clark" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="With icon" />
				<div className="border p-6 border-solid rounded-md">
					<KolInputText
						className="max-w-[400px]"
						_label="Name"
						_icons={{
							right: {
								icon: 'codicon codicon-account',
							},
						}}
						_value="Anderson-Clark"
					/>
				</div>
			</div>
		</div>
	</>
);
