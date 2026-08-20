import { KolCombobox, KolInputText, KolSelect, KolTextarea } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextAriaDetails: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to use <code>_ariaDetails</code> to reference an external element that provides detailed information about form inputs. All inputs
				below reference the same details box via their <code>_ariaDetails</code> prop.
			</p>
			<p>
				The <code>_ariaDetails</code> prop uses <code>ElementInternals.ariaDetailsElements</code> to cross the Shadow DOM boundary, making it accessible to
				screen readers. This works across all form input components: input-text, select, textarea, and combobox.
			</p>
		</SampleDescription>

		<div className="grid gap-8" data-visual-block="aria-details">
			{/* Input Form with all 4 components */}
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
		</div>
	</>
);
