import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { KolButton as StoryButton, KolModal as StoryModal } from '@public-ui/react';
import { ModalConfiguration } from './autogen.configuration';

export default {
	...ModalConfiguration,
	title: 'React/Modal/Beispiele',
	component: StoryModal,
} as unknown as ComponentMeta<typeof StoryModal>;

const KolButton: ComponentStory<typeof StoryModal> = (args: any) => {
	return <StoryButton {...args}>{args.children}</StoryButton>;
};

const KolModal: ComponentStory<typeof StoryModal> = (args: any) => {
	return <StoryModal {...args}>{args.children}</StoryModal>;
};

const DefaultArgs = {};

export const Standard = (props: { _ariaLabel: string; _width: string }) => {
	const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
	return (
		<div>
			<KolModal
				_activeElement={activeElement}
				{...props}
				_on={{
					onClose: () => {
						setActiveElement(null);
					},
				}}
			>
				<div
					style={{
						backgroundColor: 'tomato',
						height: '100px',
						width: '100%',
						alignItems: 'center',
						display: 'grid',
						gap: '.5em',
					}}
				>
					<div
						style={{
							color: 'white',
							textAlign: 'center',
						}}
					>
						{props._ariaLabel}
					</div>
					<KolButton
						_label="Schließen"
						_on={{
							onClick: () => {
								setActiveElement(null);
							},
						}}
						_variant="danger"
						style={{
							margin: 'auto',
						}}
					></KolButton>
				</div>
			</KolModal>
			<KolButton
				_label="Öffnen"
				_on={{
					onClick: (event: Event) => {
						setActiveElement(event?.target as HTMLElement);
					},
				}}
			></KolButton>
		</div>
	);
};
Standard.args = {
	...DefaultArgs,
};
