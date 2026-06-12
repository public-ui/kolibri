import { KolInputCheckbox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxAriaDetails: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to use <code>_ariaDetails</code> to reference an external element that provides detailed information about form inputs. The{' '}
				<code>_ariaDetails</code> prop uses <code>ElementInternals.ariaDetailsElements</code> to cross the Shadow DOM boundary, making it accessible to screen
				readers.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			{/* Checkbox with independent details */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Checkbox with Aria Details</h2>

				<KolInputCheckbox _label="Accept terms of service" _ariaDetails="checkbox-details" />

				<div id="checkbox-details" className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded" role="complementary">
					<h3 className="font-semibold text-blue-900 mb-2">Terms and Conditions</h3>
					<p className="text-sm text-blue-800">
						By checking this box, you agree to our terms of service and privacy policy. Please read them carefully before proceeding.
					</p>
				</div>
			</div>

			{/* Multiple checkboxes with different details */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Multiple Checkboxes with Individual Details</h2>

				<KolInputCheckbox _label="Enable notifications" _ariaDetails="notification-details" />

				<KolInputCheckbox _label="Share usage data" _ariaDetails="usage-details" />

				<div id="notification-details" className="p-4 bg-green-50 border-l-4 border-green-400 rounded" role="complementary">
					<h3 className="font-semibold text-green-900 mb-2">About Notifications</h3>
					<p className="text-sm text-green-800">We will send you important updates and alerts about your account activity.</p>
				</div>

				<div id="usage-details" className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded" role="complementary">
					<h3 className="font-semibold text-orange-900 mb-2">About Usage Data</h3>
					<p className="text-sm text-orange-800">
						Sharing usage data helps us improve our service and provide better experiences. Your data is encrypted and never shared with third parties.
					</p>
				</div>
			</div>
		</div>
	</>
);
