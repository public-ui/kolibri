import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import {
	KolButton,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolTextarea,
} from '@public-ui/react';

export const StaticForm: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows how you can use KoliBri in static form context, too.</p>
				<ol>
					<li>
						First you have to enable the <code>experimental mode</code>:{' '}
						<code className="bg-gray-200">&lt;meta name=&quot;kolibri&quot; content=&quot;dev-mode=false;experimental-mode=true;&quot; /&gt;</code>
					</li>
					<li>
						Actually you have to use a native <code>form</code> element:{' '}
						<code className="bg-gray-200">&lt;form method=&quot;GET&quot;&gt;...&lt;/form&gt;</code>
					</li>
					<li>
						It is important in static usage to give every input a <code>name</code> attribute, because the form data will be sent as a query string:{' '}
						<code className="bg-gray-200">&lt;KolInputColor _name=&quot;color&quot; _label=&quot;Color&quot; /&gt;</code>
					</li>
					<li>
						Last of all one button should have the type <code>submit</code>:{' '}
						<code className="bg-gray-200">&lt;KolButton _label=&quot;Submit&quot; _type=&quot;submit&quot; _variant=&quot;primary&quot; /&gt;</code>
					</li>
				</ol>
			</SampleDescription>
			<form className="grid gap-4" method="get">
				<KolInputCheckbox _name="checkbox" _label="Checkbox" />
				<KolInputColor _name="color" _label="Color" />
				<KolInputDate _name="date" _label="Date" />
				<KolInputEmail _name="email" _label="Email" />
				<KolInputNumber _name="number" _label="Number" />
				<KolInputPassword _name="password" _label="Password" />
				<KolInputRange _name="range" _label="Range" />
				<KolInputText _name="text" _label="Text" />
				<KolInputRadio
					_name="radio"
					_label="Radio"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
				/>
				<KolSelect
					_name="select"
					_label="Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
				/>
				<KolTextarea _name="textarea" _label="Textarea" />
				<div className="flex flex-wrap gap-4">
					<KolButton _label="Submit" _type="submit" _variant="primary" />
					<KolButton _label="Reset" _type="reset" />
				</div>
			</form>
		</>
	);
};
