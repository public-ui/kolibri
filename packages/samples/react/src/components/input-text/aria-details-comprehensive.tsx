import { KolInputCheckbox, KolInputEmail, KolSingleSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextAriaDetailsComprehensive: FC = () => (
	<>
		<SampleDescription>
			<p>
				Comprehensive example demonstrating <code>_ariaDetails</code> across three representative form components: input-checkbox, input-email, and
				single-select. Each component references external elements that provide detailed information accessible to screen readers via{' '}
				<code>ElementInternals.ariaDetailsElements</code>.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			{/* Form with all 3 representative components */}
			<div className="grid gap-6 p-6 border border-gray-300 rounded bg-gray-50">
				<h2 className="text-xl font-semibold text-gray-900">Form with Aria Details Support</h2>

				{/* Input Checkbox */}
				<div className="grid gap-2">
					<KolInputCheckbox _label="I agree to the terms of service" _ariaDetails="checkbox-terms-details" />
					<div id="checkbox-terms-details" className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800" role="complementary">
						<strong>Terms of Service:</strong> Please review our complete terms and conditions. By checking this box, you acknowledge that you have read,
						understood, and agree to be bound by our terms.
					</div>
				</div>

				{/* Input Email */}
				<div className="grid gap-2">
					<KolInputEmail _label="Email Address" _ariaDetails="email-account-details" _placeholder="your.email@example.com" />
					<div id="email-account-details" className="p-3 bg-green-50 border-l-4 border-green-400 rounded text-sm text-green-800" role="complementary">
						<strong>Email Usage:</strong> We'll use this email address for account verification, password recovery, and important service notifications. You can
						change it anytime in your account settings.
					</div>
				</div>

				{/* Single Select */}
				<div className="grid gap-2">
					<KolSingleSelect
						_label="Preferred Communication Channel"
						_ariaDetails="select-communication-details"
						_options={[
							{ label: 'Email', value: 'email' },
							{ label: 'SMS', value: 'sms' },
							{ label: 'Push Notifications', value: 'push' },
							{ label: 'In-App Messages', value: 'inapp' },
						]}
					/>
					<div id="select-communication-details" className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded text-sm text-orange-800" role="complementary">
						<strong>Communication Preferences:</strong> Choose your preferred method for receiving updates and alerts. You can change this setting at any time
						in your notification preferences.
					</div>
				</div>
			</div>

			{/* Additional Example: Multiple Details per Component */}
			<div className="grid gap-6 p-6 border border-gray-300 rounded bg-gray-50">
				<h2 className="text-xl font-semibold text-gray-900">Advanced: Single Component with Multiple Details</h2>

				<div className="grid gap-2">
					<KolSingleSelect
						_label="Data Processing Consent"
						_ariaDetails="consent-details consent-legal"
						_options={[
							{ label: 'Accept All', value: 'all' },
							{ label: 'Accept Essential Only', value: 'essential' },
							{ label: 'Decline All', value: 'none' },
						]}
					/>
					<div id="consent-details" className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded text-sm text-purple-800" role="complementary">
						<strong>Data Processing:</strong> Your consent choice determines how we process and analyze your data to improve our service. Learn more about{' '}
						<a href="#" className="underline">
							our privacy practices
						</a>
						.
					</div>
					<div id="consent-legal" className="p-3 bg-red-50 border-l-4 border-red-400 rounded text-sm text-red-800" role="complementary">
						<strong>Legal Notice:</strong> This consent is governed by GDPR regulations. You can withdraw your consent at any time. See our full privacy policy
						for details.
					</div>
				</div>
			</div>
		</div>
	</>
);
