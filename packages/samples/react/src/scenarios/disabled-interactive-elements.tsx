import {
	KolAccordion,
	KolButton,
	KolButtonLink,
	KolCard,
	KolDetails,
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
	KolLink,
	KolLinkButton,
	KolSelect,
	KolTextarea,
} from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';

const OPTIONS = [
	{
		label: 'Option A',
		value: 'A',
	},
	{
		label: 'Option B',
		value: 'B',
	},
];

export const DisabledInteractiveElements: FC = () => (
	<>
		<SampleDescription>
			<p>This example shows how deactivated interactive elements are displayed.</p>
			<ul>
				<li>Deactivated interactive elements pose a particular challenge for accessibility.</li>
				<li>It must not be possible to focus on deactivated interactive elements, otherwise the tab paths will be unnecessarily extended.</li>
				<li>Deactivated interactive elements should be labelled clearly and legibly.</li>
				<li>
					Deactivated interactive elements have a tooltip for sighted people and aria labelling for the screen readers reading mode if they are represented by
					an interpretable graphic.
				</li>
			</ul>
			<p>This implementation ensures standardized use for all users.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolCard _label="Button" _level={0}>
				<div className="flex flex-wrap gap-4">
					<KolButton _label="Label" />
					<KolButton _disabled _label="Label" />
					<KolButton _hideLabel _icons="codicon codicon-home" _label="Label" />
					<KolButton _disabled _hideLabel _icons="codicon codicon-home" _label="Label" />
				</div>
			</KolCard>
			<KolCard _label="ButtonLink" _level={0}>
				<div className="flex flex-wrap gap-4">
					<KolButtonLink _label="Label" />
					<KolButtonLink _disabled _label="Label" />
					<KolButtonLink _hideLabel _icons="codicon codicon-home" _label="Label" />
					<KolButtonLink _hideLabel _icons="codicon codicon-home" _disabled _label="Label" />
				</div>
			</KolCard>
			<KolCard _label="Link" _level={0}>
				<div className="flex flex-wrap gap-4">
					<KolLink _href="#" _label="Label" />
					<KolLink _disabled _href="#" _label="Label" />
					<KolLink _hideLabel _href="#" _icons="codicon codicon-home" _label="Label" />
					<KolLink _disabled _hideLabel _href="#" _icons="codicon codicon-home" _label="Label" />
				</div>
			</KolCard>
			<KolCard _label="LinkButton" _level={0}>
				<div className="flex flex-wrap gap-4">
					<KolLinkButton _href="#" _label="Label" />
					<KolLinkButton _disabled _href="#" _label="Label" />
					<KolLinkButton _hideLabel _href="#" _icons="codicon codicon-home" _label="Label" />
					<KolLinkButton _disabled _hideLabel _href="#" _icons="codicon codicon-home" _label="Label" />
				</div>
			</KolCard>
			<KolCard _label="Accordion" _level={0}>
				<div className="grid gap-4">
					<KolAccordion _label="Label">Content</KolAccordion>
					<KolAccordion _disabled _label="Label">
						Content
					</KolAccordion>
					<KolAccordion _label="Label (open)" _open>
						Content
					</KolAccordion>
					<KolAccordion _disabled _label="Label (open)" _open>
						Content
					</KolAccordion>
				</div>
			</KolCard>
			<KolCard _label="Details" _level={0}>
				<div className="grid gap-4">
					<KolDetails _label="Label">Content</KolDetails>
					<KolDetails _disabled _label="Label">
						Content
					</KolDetails>
					<KolDetails _label="Label (open)" _open>
						Content
					</KolDetails>
					<KolDetails _disabled _label="Label (open)" _open>
						Content
					</KolDetails>
				</div>
			</KolCard>
			{[KolInputCheckbox, KolInputColor, KolInputDate, KolInputEmail, KolInputFile, KolInputNumber, KolInputPassword, KolInputRange, KolInputText].map(
				(Input) => {
					const render = (
						Input as typeof KolInputCheckbox & {
							render: { displayName: string };
						}
					).render;
					const name = render.displayName;
					return (
						<KolCard key={name} _label={name} _level={0}>
							<div className="grid gap-4">
								<Input _label="Label" />
								<Input _disabled _label="Label" />
								<Input _hideLabel _label="Label" />
								<Input _disabled _hideLabel _label="Label" />
							</div>
						</KolCard>
					);
				},
			)}
			{[KolInputRadio, KolSelect].map((Input) => {
				const render = (
					Input as typeof KolInputRadio & {
						render: { displayName: string };
					}
				).render;
				const name = render.displayName;
				return (
					<KolCard key={name} _label={name} _level={0}>
						<div className="grid gap-4">
							<Input _label="Label" _options={OPTIONS} />
							<Input _disabled _label="Label" _options={OPTIONS} />
							<Input _hideLabel _label="Label" _options={OPTIONS} />
							<Input _disabled _hideLabel _label="Label" _options={OPTIONS} />
						</div>
					</KolCard>
				);
			})}
			<KolCard _label="KolTextarea" _level={0}>
				<div className="grid gap-4">
					<KolTextarea _label="Label" _rows={3} />
					<KolTextarea _disabled _label="Label" _rows={3} />
					<KolTextarea _hideLabel _label="Label" _rows={3} />
					<KolTextarea _disabled _hideLabel _label="Label" _rows={3} />
				</div>
			</KolCard>
		</div>
	</>
);
