import React from 'react';

import { KolButton, KolCard as MyComponent, KolInputCheckbox, KolLogo } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CardConfiguration } from './autogen.configuration';

export default {
	...CardConfiguration,
	title: 'React/Card/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolCard: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {
	_headline: 'Card-Überschrift',
};

export const Standard = (args: any) => (
	<div>
		<KolCard {...args}>
			<div slot="header">{args.header}</div>
			<div slot="content">{args.content}</div>
			<div slot="footer">{args.footer}</div>
		</KolCard>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Sizes = (args: any) => (
	<div style={{ display: 'grid', gap: '0.25em' }}>
		<KolCard _headline="Ein Beispieltitel in Größe 1" _level={1}></KolCard>
		<KolCard _headline="Ein Beispieltitel in Größe 2" _level={2}></KolCard>
		<KolCard _headline="Ein Beispieltitel in Größe 3" _level={3}></KolCard>
		<KolCard _headline="Ein Beispieltitel in Größe 4" _level={4}></KolCard>
		<KolCard _headline="Ein Beispieltitel in Größe 5" _level={5}></KolCard>
		<KolCard _headline="Ein Beispieltitel in Größe 6" _level={6}></KolCard>
	</div>
);
Sizes.args = {
	...DefaultArgs,
};
Sizes.storyName = 'Card mit Überschrift in verschiedenen Größen';

export const WithContent = (args: any) => (
	<div>
		<KolCard {...args}>
			<div slot="content">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
			</div>
		</KolCard>
	</div>
);
WithContent.args = {
	...DefaultArgs,
	_hasFooter: false,
	_headline: 'Card mit Inhalt',
};
WithContent.storyName = 'Card mit Inhalt';

export const WithHeader = (args: any) => (
	<div>
		<KolCard {...args}>
			<div slot="header">Headerbereich der Card</div>
			<div slot="content">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
			</div>
		</KolCard>
	</div>
);
WithHeader.args = {
	...DefaultArgs,
	_headline: 'Card mit Headerbereich',
};
WithHeader.storyName = 'Card mit Headerbereich';

export const WithFooter = (args: any) => (
	<div>
		<KolCard {...args}>
			<div slot="content">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
			</div>
			<div slot="footer">Fußbereich der Card</div>
		</KolCard>
	</div>
);
WithFooter.args = {
	...DefaultArgs,
	_hasFooter: true,
	_headline: 'Card mit Fußbereich',
};
WithFooter.storyName = 'Card mit Fußbereich';

export const WithButton = (args: any) => (
	<div>
		<KolCard _level={1} _has-footer _headline="Mit h1-Überschrift und Footer">
			<div slot="content">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta pariatur laudantium saepe ipsa atque officia cupiditate repudiandae harum earum aut
				doloribus autem libero exercitationem dolor ad, magni dignissimos ratione fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
				perferendis qui animi nesciunt illo facere, doloribus sint cupiditate nihil dolorem voluptate ab esse! Ducimus ad est commodi molestias voluptas
				reiciendis.
			</div>
			<div slot="footer" className="pt-1 pb-1">
				<KolButton
					_variant="primary"
					_label="Ok"
					_on={{
						onClick: () => {
							alert(`Hi, es wurde der Button "Ok" angeklickt`);
						},
					}}
					style={{
						marginRight: '5px',
					}}
				></KolButton>
				<KolButton
					_variant="primary"
					_label="Abbrechen"
					_on={{
						onClick: () => {
							alert(`Hi, es wurde der Button "Abbrechen" angeklickt`);
						},
					}}
				></KolButton>
			</div>
		</KolCard>
	</div>
);

WithButton.storyName = 'Card mit Buttons';

export const WithStyleContent = (args: any) => (
	<div>
		<KolCard {...args}>
			<div slot="header">
				<div style={{ display: 'flex', alignItems: 'start', margin: '10px 0' }}>
					<div style={{ width: '300px' }}>
						<KolLogo _org="BReg"> </KolLogo>
					</div>
					<p>
						2-spaltige Anordnung im header-Slot. Das Layout kann mit HTML und CSS, aber auch mit allen KoliBri-Komponenten gestaltet werden.<br></br>
					</p>
				</div>
			</div>
			<div slot="content" style={{ margin: '-15px' }}>
				<div style={{ padding: '15px' }}>
					Beispiel im content-Slot. Das layout kann auch hier mit HTML, CSS und KoliBri-Komponenten gestaltet werden. Auch Bilder, die über ganze Breite der
					Card gehen sollen, sind mit wenigen Anpassungen per CSS möglich.
				</div>
				<div>
					<img style={{ backgroundColor: '#e1e1e1', width: '100%', height: 'auto' }} alt="Beispielbild" src="https://via.placeholder.com/200" />
				</div>
				<div style={{ padding: '15px' }}>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
					voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
					voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</div>
			</div>
		</KolCard>
	</div>
);
WithStyleContent.args = {
	...DefaultArgs,
	_headline: 'Headline - nicht frei gestaltbar',
};
WithStyleContent.storyName = 'Card mit Inhalten';

export const WithStyleChoose = (args: any) => (
	<div style={{ display: 'flex', gap: '0.5em' }}>
		<KolCard {...args}>
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content" style={{ margin: '-15px' }}>
				<div>
					<img style={{ backgroundColor: '#e1e1e1', width: '100%', height: 'auto' }} alt="Beispielbild" src="https://via.placeholder.com/200" />
				</div>
			</div>
			<div slot="footer">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
		<KolCard {...args}>
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content" style={{ margin: '-15px' }}>
				<div>
					<img style={{ backgroundColor: '#e1e1e1', width: '100%', height: 'auto' }} alt="Beispielbild" src="https://via.placeholder.com/200" />
				</div>
			</div>
			<div slot="footer">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
		<KolCard {...args}>
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content" style={{ margin: '-15px' }}>
				<div>
					<img style={{ backgroundColor: '#e1e1e1', width: '100%', height: 'auto' }} alt="Beispielbild" src="https://via.placeholder.com/200" />
				</div>
			</div>
			<div slot="footer">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
	</div>
);
WithStyleChoose.args = {
	...DefaultArgs,
	_headline: 'DEBTI-25437/17-1',
};
WithStyleChoose.storyName = 'Card als Auswahl';
