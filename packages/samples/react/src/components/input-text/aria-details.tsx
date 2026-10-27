import { KolCombobox, KolInputText, KolSelect, KolTextarea } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import '../../@shared/demo-input-wc';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextAriaDetails: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to use <code>_ariaDetails</code> to reference an external element that provides detailed information about form inputs. All inputs
				below reference the same details box via their <code>_ariaDetails</code> prop.
			</p>
			<p>
				The native inputs above are the control group: the first one declares a plain <code>aria-details</code> IDREF in the same tree, the second one is
				wrapped in a native web component whose shadow input bridges the reference via <code>ariaDetailsElements</code> — the same mechanism KoliBri uses. If a
				native case announces the details in a screen reader while the KoliBri fields do not, the gap is in KoliBri; if the native shadow case is silent too,
				the platform does not support the relation across the boundary yet (Safari/VoiceOver lacks element reflection — verify with NVDA or JAWS on Chromium
				instead).
			</p>
		</SampleDescription>

		<SampleBlock id="aria-details" className="grid gap-8">
			{/* Native reference implementations — the control group */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Native reference implementations</h2>

				<div>
					<label className="block">
						<span className="block mb-2">Native HTML input (no web component)</span>
						<input aria-details="details-box-native-light" aria-label="Native light input" className="border border-gray-500 p-2" />
					</label>
					<div id="details-box-native-light" className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
						Details for the plain native input: the IDREF resolves in the same tree — no boundary to cross.
					</div>
				</div>

				<div>{React.createElement('demo-input-light', { 'aria-details': 'details-box-native-light' })}</div>

				<div>
					{React.createElement('demo-input-shadow', { 'aria-details': 'details-box-native-shadow' })}
					<div id="details-box-native-shadow" className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
						Details for the native shadow input: the reference crosses the boundary via <code>ariaDetailsElements</code> on the input.
					</div>
				</div>
			</div>

			{/* KoliBri form fields */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Form Inputs with Shared Details</h2>

				<KolInputText _label="Email Address" _ariaDetails="details-box" _placeholder="user@example.com" _hint="We'll never share your email" />

				<KolSelect
					_label="Country"
					_ariaDetails="details-box"
					_options={[
						{ label: 'Germany', value: 'de' },
						{ label: 'Austria', value: 'at' },
						{ label: 'Switzerland', value: 'ch' },
					]}
				/>

				<KolTextarea _label="Message" _ariaDetails="details-box" _placeholder="Enter your message here..." _rows={4} />

				<KolCombobox _label="Favorite Language" _ariaDetails="details-box" _suggestions={['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java']} />
			</div>

			{/* Shared details box */}
			<div id="details-box" className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded" role="complementary">
				<h3 className="font-semibold text-blue-900 mb-2">💡 Form Details</h3>
				<ul className="text-sm text-blue-800 space-y-2">
					<li>
						<strong>Email:</strong> Please enter a valid email address. We use this to contact you about your submission.
					</li>
					<li>
						<strong>Country:</strong> Select your country of residence. This helps us provide localized support.
					</li>
					<li>
						<strong>Message:</strong> Provide as much detail as possible. The more information you give, the better we can assist you.
					</li>
					<li>
						<strong>Language:</strong> Choose your preferred programming language. This helps us recommend relevant resources.
					</li>
				</ul>
			</div>
		</SampleBlock>
	</>
);
