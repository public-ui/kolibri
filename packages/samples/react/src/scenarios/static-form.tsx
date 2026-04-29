import {
	KolButton,
	KolCombobox,
	KolHeading,
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
	KolTextarea,
} from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { COUNTRY_SUGGESTIONS, COUNTRY_OPTIONS } from '../shares/country';

export const StaticForm: FC = () => {
	const { searchParams } = new URL(location.href);

	// Options for Select/Radio components
	const GENDER_OPTIONS = [
		{ label: 'Male', value: 'male' },
		{ label: 'Female', value: 'female' },
		{ label: 'Diverse', value: 'diverse' },
		{ label: 'Prefer not to say', value: 'none' },
	];

	const LANGUAGE_OPTIONS = [
		{ label: 'German', value: 'de' },
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'Spanish', value: 'es' },
	];

	const INTEREST_OPTIONS = [
		{ label: 'Technology', value: 'tech' },
		{ label: 'Sports', value: 'sports' },
		{ label: 'Culture', value: 'culture' },
		{ label: 'Science', value: 'science' },
		{ label: 'Travel', value: 'travel' },
		{ label: 'Cooking', value: 'cooking' },
	];

	return (
		<>
			<SampleDescription>
				<p>This example demonstrates a practical user registration form using KoliBri components.</p>
				<ol>
					<li>
						Enable the <code>experimental mode</code>:{' '}
						<code className="bg-gray-200"><meta name="kolibri" content="dev-mode=false;experimental-mode=true;" /></code>
					</li>
					<li>
						Use a native <code>form</code> element:{' '}
						<code className="bg-gray-200"><form method="GET">...</form></code>
					</li>
					<li>
						Each input field requires a <code>name</code> attribute:{' '}
						<code className="bg-gray-200"><KolInputText _name="firstname" _label="First name" /></code>
					</li>
					<li>
						One button must have the type <code>submit</code>:{' '}
						<code className="bg-gray-200"><KolButton _label="Register" _type="submit" _variant="primary" /></code>
					</li>
				</ol>
			</SampleDescription>

			<section className="w-full flex flex-col">
				{searchParams.size > 0 && (
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Submitted data" />
						<pre className="text-base">
							<code>{JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}</code>
						</pre>
					</div>
				)}

				<form className="grid gap-6" method="get" noValidate>
					{/* Personal Information */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Personal Information" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="firstname" _label="First name" _required _hint="Required field" />
							<KolInputText _name="lastname" _label="Last name" _required _hint="Required field" />
						</div>
						<KolInputDate _name="birthdate" _label="Date of birth" _required _hint="Required field" />
						<KolInputRadio
							_name="gender"
							_label="Gender"
							_options={GENDER_OPTIONS}
							_orientation="horizontal"
						/>
					</div>

					{/* Contact Information */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Contact Information" />
						<KolInputEmail _name="email" _label="Email address" _required _hint="Required field" _type="email" />
						<KolInputText _name="phone" _label="Phone number" _type="tel" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="street" _label="Street and house number" />
							<KolInputText _name="zip" _label="ZIP code" />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="city" _label="City" />
							<KolSelect
								_name="country"
								_label="Country"
								_options={COUNTRY_OPTIONS}
								_required
							/>
						</div>
					</div>

					{/* Preferences */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Your Preferences" />
						<KolInputCheckbox _name="newsletter" _label="I want to subscribe to the newsletter" />
						<KolSelect
							_name="language"
							_label="Preferred language"
							_options={LANGUAGE_OPTIONS}
							_required
						/>
						<KolSelect
							_name="interests"
							_label="Your interests (multiple selection)"
							_options={INTEREST_OPTIONS}
							_multiple
							_rows={3}
						/>
						<KolInputRange
							_name="notifications"
							_label="Notification frequency"
							_min={0}
							_max={10}
							_value={3}
							_step={1}
							_list={[
								{ label: 'Never', value: 0 },
								{ label: 'Rarely', value: 3 },
								{ label: 'Often', value: 7 },
								{ label: 'Always', value: 10 },
							]}
						/>
					</div>

					{/* Account Credentials */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Account Credentials" />
						<KolInputText _name="username" _label="Username" _required _hint="Required field" />
						<KolInputPassword
							_name="password"
							_label="Password"
							_required
							_hint="Minimum 8 characters"
							_pattern=".{8,}"
						/>
						<KolInputPassword
							_name="password_confirmation"
							_label="Confirm password"
							_required
							_hint="Confirm your password"
							_pattern=".{8,}"
						/>
					</div>

					{/* Legal */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Legal" />
						<KolInputCheckbox
							_name="terms"
							_label="I accept the terms and conditions"
							_required
							_error="You must accept the terms and conditions"
						/>
						<KolInputCheckbox
							_name="privacy"
							_label="I agree to the processing of my data according to the privacy policy"
							_required
							_error="You must agree to data processing"
						/>
						<KolInputCheckbox
							_name="marketing"
							_label="I agree to receive marketing emails"
						/>
					</div>

					{/* Avatar Upload */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Profile Picture" />
						<KolInputFile
							_name="avatar"
							_label="Upload profile picture"
							_accept="image/*"
							_hint="Maximum 2MB"
						/>
					</div>

					{/* Theme Settings */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Design Settings" />
						<KolInputColor
							_name="theme_color"
							_label="Choose your preferred theme color"
							_value="#3f51b5"
						/>
					</div>

					{/* Comments */}
					<div className="grid gap-4">
						<KolTextarea
							_name="comments"
							_label="Additional comments or notes"
							_rows={5}
							_placeholder="You can provide additional information here..."
						/>
					</div>

					{/* Buttons */}
					<div className="flex flex-wrap gap-4">
						<KolButton _label="Register" _type="submit" _variant="primary" _icons="codicon codicon-check" />
						<KolButton _label="Reset" _type="reset" _variant="secondary" _icons="codicon codicon-trash" />
					</div>

					{/* Hidden Input to force submission */}
					<input type="hidden" value={crypto.randomUUID()} name="random" />
				</form>
			</section>
		</>
	);
};
