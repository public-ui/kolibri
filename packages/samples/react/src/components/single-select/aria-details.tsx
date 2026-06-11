import { KolSingleSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const SingleSelectAriaDetails: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to use <code>_ariaDetails</code> to reference external elements that provide detailed information about select options. The{' '}
				<code>_ariaDetails</code> prop uses <code>ElementInternals.ariaDetailsElements</code> to cross the Shadow DOM boundary, making it accessible to screen
				readers.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			{/* Single Select with independent details */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Single Select with Aria Details</h2>

				<KolSingleSelect
					_label="Select your country"
					_ariaDetails="country-details"
					_options={[
						{ label: 'Germany', value: 'de' },
						{ label: 'Austria', value: 'at' },
						{ label: 'Switzerland', value: 'ch' },
						{ label: 'Netherlands', value: 'nl' },
					]}
				/>

				<div id="country-details" className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded" role="complementary">
					<h3 className="font-semibold text-blue-900 mb-2">Country Selection</h3>
					<p className="text-sm text-blue-800">
						Select your country of residence. This helps us provide localized content, shipping information, and applicable tax rates for your region.
					</p>
				</div>
			</div>

			{/* Multiple Single Selects with different details */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Multiple Selects with Individual Details</h2>

				<KolSingleSelect
					_label="Experience Level"
					_ariaDetails="experience-details"
					_options={[
						{ label: 'Beginner', value: 'beginner' },
						{ label: 'Intermediate', value: 'intermediate' },
						{ label: 'Advanced', value: 'advanced' },
						{ label: 'Expert', value: 'expert' },
					]}
				/>

				<KolSingleSelect
					_label="Support Plan"
					_ariaDetails="support-details"
					_options={[
						{ label: 'Community (Free)', value: 'community' },
						{ label: 'Standard', value: 'standard' },
						{ label: 'Professional', value: 'professional' },
						{ label: 'Enterprise', value: 'enterprise' },
					]}
				/>

				<div id="experience-details" className="p-4 bg-green-50 border-l-4 border-green-400 rounded" role="complementary">
					<h3 className="font-semibold text-green-900 mb-2">About Experience Level</h3>
					<p className="text-sm text-green-800">
						Your experience level helps us provide appropriate documentation, tutorials, and support. It also affects which features are recommended to you.
					</p>
				</div>

				<div id="support-details" className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded" role="complementary">
					<h3 className="font-semibold text-orange-900 mb-2">Support Plans</h3>
					<ul className="text-sm text-orange-800 space-y-1">
						<li>
							<strong>Community:</strong> Community forums only
						</li>
						<li>
							<strong>Standard:</strong> Email support, 24-hour response
						</li>
						<li>
							<strong>Professional:</strong> Priority email + phone, 4-hour response
						</li>
						<li>
							<strong>Enterprise:</strong> Dedicated support, 1-hour response + SLA
						</li>
					</ul>
				</div>
			</div>
		</div>
	</>
);
