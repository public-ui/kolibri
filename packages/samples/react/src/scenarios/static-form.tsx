import {
	KolButton,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
	KolCombobox,
	KolTextarea,
	KolHeading,
} from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { COUNTRY_SUGGESTIONS } from '../shares/country';

export const StaticForm: FC = () => {
	const { searchParams } = new URL(location.href);

	return (
		<>
			<SampleDescription>
				<p>This sample shows how KoliBri can be used in a static form context.</p>
				<ol>
					<li>
						First you have to enable the <code>experimental mode</code>:{' '}
						<code className="bg-gray-200">&lt;meta name=&quot;kolibri&quot; content=&quot;dev-mode=false;experimental-mode=true;&quot; /&gt;</code>
					</li>
					<li>
						Currently you have to use a native <code>form</code> element:{' '}
						<code className="bg-gray-200">&lt;form method=&quot;GET&quot;&gt;...&lt;/form&gt;</code>
					</li>
					<li>
						It is important in static usage to give every input a <code>name</code> attribute:{' '}
						<code className="bg-gray-200">&lt;KolInputColor _name=&quot;color&quot; _label=&quot;Color&quot; /&gt;</code>
					</li>
					<li>
						Last of all one button should have the type <code>submit</code>:{' '}
						<code className="bg-gray-200">&lt;KolButton _label=&quot;Submit&quot; _type=&quot;submit&quot; _variant=&quot;primary&quot; /&gt;</code>
					</li>
				</ol>
			</SampleDescription>

			{searchParams.size > 0 && (
				<div className="grid gap-4">
					<KolHeading _level={2} _label="Submitted data" />
					<pre>
						<code>{JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}</code>
					</pre>
				</div>
			)}

			<form className="grid gap-4" method="get" noValidate>
				<KolInputCheckbox _name="checkbox" _label="Checkbox" />
				<KolInputColor _name="color" _label="Color" />
				<KolInputDate _name="date" _label="Date" />
				<KolInputEmail _name="email" _label="Email" />
				<KolInputFile _name="file" _label="File" />
				<KolInputFile _name="file" _label="Files (multiple)" _multiple />
				<KolInputNumber _name="number" _label="Number" />
				<KolInputPassword _name="password" _label="Password" />
				<KolInputRadio
					_name="radio"
					_label="Radio"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
				/>
				<KolInputRange _name="range" _label="Range" />
				<KolInputText _name="text" _label="Text" />
				<KolSelect
					_name="select"
					_label="Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
				/>
				<KolSelect
					_name="select"
					_label="Select (multiple)"
					_multiple
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
					_rows={2}
				/>
				<KolSingleSelect
					_name="singleSelect"
					_label="Single Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
				/>
				<KolCombobox _name="combobox" _label="Combobox" _suggestions={COUNTRY_SUGGESTIONS} />
				<KolTextarea _name="textarea" _label="Textarea" _rows={5} />
				<div className="flex flex-wrap gap-4">
					<KolButton _label="Submit" _type="submit" _variant="primary" />
					<KolButton _label="Reset" _type="reset" />
				</div>

				{/* Add a random string to allow the form to be always submitted. Without it, if theres no change to the data, the form simply won't submit when requested. */}
				<input type="hidden" value={crypto.randomUUID()} name="random" />
			</form>
		</>
	);
};
