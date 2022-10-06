import React, { useState } from 'react';

import { KolButton, KolTextarea as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { TextareaConfiguration } from './autogen.configuration';

export default {
	...TextareaConfiguration,
	title: 'React/Textarea/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolTextarea: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolTextarea _rows={args._rows} {...args}></KolTextarea>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Placeholder = (args: any) => (
	<div>
		<KolTextarea _id="" _name="" _value="" _placeholder="Hier steht ein Platzhaltertext"></KolTextarea>
	</div>
);
Placeholder.args = {
	...DefaultArgs,
};

Placeholder.storyName = 'Platzhaltertext';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Rows1 = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={1}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_readOnly={true}
		></KolTextarea>
	</div>
);
Rows1.args = {
	...DefaultArgs,
};

Rows1.storyName = 'Höhe: 1 Zeile';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Rows10 = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={10}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_readOnly={true}
		></KolTextarea>
	</div>
);
Rows10.args = {
	...DefaultArgs,
};

Rows10.storyName = 'Höhe: 10 Zeilen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const ResizeNone = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={4}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_resize="none"
		></KolTextarea>
	</div>
);
ResizeNone.args = {
	...DefaultArgs,
};

ResizeNone.storyName = 'Keine Größenänderung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const ResizeVertical = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={4}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_resize="vertical"
		></KolTextarea>
	</div>
);
ResizeVertical.args = {
	...DefaultArgs,
};

ResizeVertical.storyName = 'Vertikale Größenänderung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const ResizeHorizontal = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={4}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_resize="horizontal"
		></KolTextarea>
	</div>
);
ResizeHorizontal.args = {
	...DefaultArgs,
};

ResizeHorizontal.storyName = 'Horizontale Größenänderung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const ResizeBoth = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_rows={4}
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_resize="both"
		></KolTextarea>
	</div>
);
ResizeBoth.args = {
	...DefaultArgs,
};

ResizeBoth.storyName = 'Beidseitige Größenänderung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Readonly = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_readOnly={true}
		></KolTextarea>
	</div>
);
Readonly.args = {
	...DefaultArgs,
};

Readonly.storyName = 'Read only';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Disabled = (args: any) => (
	<div>
		<KolTextarea
			_id=""
			_name=""
			_value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet."
			_disabled={true}
		></KolTextarea>
	</div>
);
Disabled.args = {
	...DefaultArgs,
};

Disabled.storyName = 'Nicht aktiv';

export const Formularbeispiel = () => {
	const [touched, setTouched] = useState<boolean>(false);
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolTextarea {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Beispieltext
			</KolTextarea>
			<KolTextarea _readOnly {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Beispieltext (Read only)
			</KolTextarea>
			<KolTextarea _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Beispieltext (disabled)
			</KolTextarea>
			<div style={{ display: 'flex', gap: '0.25em' }}>
				<KolButton
					_variant="primary"
					_label="Absenden"
					_on={{
						onClick: () => {
							setTouched(true);
						},
					}}
				></KolButton>
				<KolButton
					_variant="ghost"
					_label="Zurücksetzen"
					_on={{
						onClick: () => {
							setTouched(false);
						},
					}}
				></KolButton>
			</div>
		</div>
	);
};
