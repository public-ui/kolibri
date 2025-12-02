import React from 'react';

import { KolAccordion, KolHeading } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const AccordionBasic: FC = () => (
	<>
		<SampleDescription>
			<KolHeading _level={1} _label="Accordion" />
			<p>
				KolAccordion hides its content until opened. The open state can be toggled by clicking the headline or by setting the <code>_open</code>-prop
				programmatically. Additionally, the sample shows the disabled state for a closed and an open accordion.
			</p>
		</SampleDescription>

		<div className="flex flex-col gap-12 py-8">
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Default" />
				<div className="border p-6 border-solid rounded-md">
					<KolAccordion _label="Spring">
						Spring is the season when nature slowly wakes up after the cold winter months. Trees grow new leaves, flowers begin to bloom, and animals become
						more active again. The weather usually gets warmer, and people enjoy spending more time outside. Many consider spring a fresh start because
						everything feels new and full of energy.
					</KolAccordion>
					<KolAccordion _open _label="Summer">
						Summer is the warmest season of the year, often filled with long sunny days and pleasant evenings. People like to go swimming, travel, or enjoy
						outdoor activities such as hiking and barbecues. School holidays often take place during this time, giving families more time together. The bright,
						hot weather makes summer feel lively and full of adventure.
					</KolAccordion>
					<KolAccordion _label="Autumn (Fall)">
						Autumn is the season when the temperature slowly drops, and nature changes its appearance. Leaves turn red, yellow, and brown before falling from
						the trees, creating colorful landscapes. Farmers harvest their crops, and many animals prepare for winter. The chilly air and shorter days make
						autumn a calm, reflective season with a cozy atmosphere.
					</KolAccordion>
					<KolAccordion _label="Winter">
						Winter is the coldest season, often bringing snow, frost, and dark evenings. Many people stay indoors to keep warm, while others enjoy winter sports
						like skiing or ice skating. Animals adapt by growing thicker fur or finding shelter. Despite the harsh weather, winter can feel peaceful, especially
						when snow covers the landscape in a quiet, white layer.
					</KolAccordion>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="With headings (level 3)" />
				<div className="border p-6 border-solid rounded-md">
					<KolAccordion _label="Spring" _level={3}>
						Spring is the season when nature slowly wakes up after the cold winter months. Trees grow new leaves, flowers begin to bloom, and animals become
						more active again. The weather usually gets warmer, and people enjoy spending more time outside. Many consider spring a fresh start because
						everything feels new and full of energy.
					</KolAccordion>
					<KolAccordion _open _label="Summer" _level={3}>
						Summer is the warmest season of the year, often filled with long sunny days and pleasant evenings. People like to go swimming, travel, or enjoy
						outdoor activities such as hiking and barbecues. School holidays often take place during this time, giving families more time together. The bright,
						hot weather makes summer feel lively and full of adventure.
					</KolAccordion>
					<KolAccordion _label="Autumn (Fall)" _level={3}>
						Autumn is the season when the temperature slowly drops, and nature changes its appearance. Leaves turn red, yellow, and brown before falling from
						the trees, creating colorful landscapes. Farmers harvest their crops, and many animals prepare for winter. The chilly air and shorter days make
						autumn a calm, reflective season with a cozy atmosphere.
					</KolAccordion>
					<KolAccordion _label="Winter" _level={3}>
						Winter is the coldest season, often bringing snow, frost, and dark evenings. Many people stay indoors to keep warm, while others enjoy winter sports
						like skiing or ice skating. Animals adapt by growing thicker fur or finding shelter. Despite the harsh weather, winter can feel peaceful, especially
						when snow covers the landscape in a quiet, white layer.
					</KolAccordion>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Disabled" />
				<div className="border p-6 border-solid rounded-md">
					<KolAccordion _label="Spring">
						Spring is the season when nature slowly wakes up after the cold winter months. Trees grow new leaves, flowers begin to bloom, and animals become
						more active again. The weather usually gets warmer, and people enjoy spending more time outside. Many consider spring a fresh start because
						everything feels new and full of energy.
					</KolAccordion>
					<KolAccordion _open _label="Summer">
						Summer is the warmest season of the year, often filled with long sunny days and pleasant evenings. People like to go swimming, travel, or enjoy
						outdoor activities such as hiking and barbecues. School holidays often take place during this time, giving families more time together. The bright,
						hot weather makes summer feel lively and full of adventure.
					</KolAccordion>
					<KolAccordion _label="Autumn (Fall)" _disabled>
						Autumn is the season when the temperature slowly drops, and nature changes its appearance. Leaves turn red, yellow, and brown before falling from
						the trees, creating colorful landscapes. Farmers harvest their crops, and many animals prepare for winter. The chilly air and shorter days make
						autumn a calm, reflective season with a cozy atmosphere.
					</KolAccordion>
					<KolAccordion _label="Winter">
						Winter is the coldest season, often bringing snow, frost, and dark evenings. Many people stay indoors to keep warm, while others enjoy winter sports
						like skiing or ice skating. Animals adapt by growing thicker fur or finding shelter. Despite the harsh weather, winter can feel peaceful, especially
						when snow covers the landscape in a quiet, white layer.
					</KolAccordion>
				</div>
			</div>
		</div>
	</>
);
