import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { KolAlert as MyComponent, KolHeading, KolAccordion } from '@public-ui/react';
import { AlertConfiguration } from './autogen.configuration';

export default {
	...AlertConfiguration,
	title: 'React/Alert/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const clearProps = (args: any) => {
	return {
		_alert: args._heading,
		_heading: args._heading,
		_level: args._level,
		_type: args._type,
		_variant: args._variant,
	};
};

const KolAlert: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const Template: ComponentStory<typeof MyComponent> = (args: any) => {
	const props = clearProps(args);
	return <KolAlert {...props}>{args.content}</KolAlert>;
};

export const Standard = Template.bind({});
Standard.args = {
	_heading: 'Überschrift',
	_type: 'success',
	// @ts-ignore
	content: 'Inhalt des Alert',
	_variant: 'msg-icon',
};

export const Success = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="success">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="success">In diesem Alert wird nur der Text ohne Überschrift verwendet.</KolAlert>
	</div>
);

export const Error = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="error">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="error">In diesem Alert wird nur der Text ohne Überschrift verwendet.</KolAlert>
	</div>
);

export const Info = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="info">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="info">In diesem Alert wird nur der Text ohne Überschrift verwendet.</KolAlert>
	</div>
);

export const Warning = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="warning">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="warning">In diesem Alert wird nur der Text ohne Überschrift verwendet.</KolAlert>
	</div>
);

export const Card = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="warning" _variant="card">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="warning" _variant="card">
			In diesem Alert wird nur der Text ohne Überschrift verwendet.
		</KolAlert>
	</div>
);

export const CardIcon = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="warning" _variant="card_icon">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="warning" _variant="card-icon">
			In diesem Alert wird nur der Text ohne Überschrift verwendet.
		</KolAlert>
	</div>
);

export const Msg = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="warning" _variant="msg">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="warning" _variant="msg">
			In diesem Alert wird nur der Text ohne Überschrift verwendet.
		</KolAlert>
	</div>
);

export const MsgIcon = (args: any) => (
	<div>
		<KolAlert _heading="Das ist die Überschrift des Alert." _type="warning" _variant="msg-icon">
			Das ist der Text des Alert.
		</KolAlert>
		<br />
		<KolAlert _type="warning" _variant="msg-icon">
			In diesem Alert wird nur der Text ohne Überschrift verwendet.
		</KolAlert>
	</div>
);

export const Html = (args: any) => (
	<div>
		<KolAlert _heading="Ausgabe von HTML-Code im Alert" _type="info">
			<h2 className="mt-2 mb-3">Hier wird eine H2-Überschrift ausgegeben</h2>
			<div className="row">
				<div className="col-12 col-sm-6">
					<h4>Text in einer linken Spalte</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem sed fugiat dolorum ratione et, ullam officia nobis nihil debitis, consectetur dicta
						accusantium. Vitae debitis, quibusdam vel recusandae deleniti placeat dolorem?
					</p>
				</div>
				<div className="col-12 col-sm-6">
					<h4>Text in einer rechten Spalte</h4>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod beatae officiis, velit nam dicta quae repellat perspiciatis explicabo illo. Possimus,
						molestiae deleniti! Exercitationem blanditiis ducimus similique tempora ratione consequuntur eaque!
					</p>
				</div>
			</div>
		</KolAlert>
	</div>
);
Html.storyName = 'Alert mit KoliBri-Komponenten';
